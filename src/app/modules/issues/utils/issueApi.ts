import { db } from "@/config/db/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function getOnlineStaffFromFirestore(email: string) {
  const docRef = doc(db, email, "info");

  try {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Document not found");
      throw new Error("Document not found");
    }

    const info = docSnap.data().staff;

    if (!info) {
      console.error("Invalid info object or staff list.");
      throw new Error("Invalid info object or staff list.");
    }

    const onlineStaff = info
      .filter(
        (staffMember: any) =>
          staffMember.status === "online" && staffMember.role === "concierge"
      )
      .map((staffMember: any) => ({
        name: staffMember.name,
        notificationToken: staffMember.notificationToken,
        orders: staffMember.orders,
      }));

    return assignAttendantSequentially(onlineStaff);
  } catch (error) {
    console.error("Error fetching document: ", error);
    throw error;
  }
}

interface StaffMember {
  name: string;
  token: string;
  orders: string[];
}
export function assignAttendantSequentially(
  availableStaff: StaffMember[]
): StaffMember | null {
  if (availableStaff.length === 0) return null;

  // Sort staff by number of current orders (ascending)
  const sortedStaff = [...availableStaff].sort(
    (a, b) => a.orders.length - b.orders.length
  );

  // Return the staff with the least number of orders
  return sortedStaff[0];
}

export async function setOfflineRoom(newService: any, assignedAttendant: any) {
  try {
    const docRef = doc(db, "vikumar.azad@gmail.com", "hotel");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().live.rooms;

      if (!data) {
        console.error("Data is missing in tableData");
        return false;
      }

      const newOrderId = `IS:${
        newService.location
      }:${new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;

      const newIssue = {
        issueId: newOrderId,
        name: newService.issue,
        category: newService.subCategory,
        description: newService.description
          ? newService.description
          : "No description provided",
        reportTime: new Date().toISOString(),
        status: "Assigned",
        attendant: assignedAttendant ? assignedAttendant.name : "Unassigned",
        attendantToken: assignedAttendant
          ? assignedAttendant.notificationToken
          : "",
      };

      const updatedData = data.map((item: any) => {
        if (item.bookingDetails?.location === newService.location) {
          // Merge the newIssue into issuesReported or create the object if it doesn't exist
          const updatedIssues = item.issuesReported
            ? { ...item.issuesReported, [newService.issue]: newIssue }
            : { [newService.issue]: newIssue };

          return {
            ...item,
            issuesReported: updatedIssues,
          };
        }
        return item;
      });

      console.log("updatedData", updatedData);

      await updateDoc(docRef, {
        "live.rooms": updatedData,
      });

      console.log("Data successfully updated and saved to Firestore.");
      return true;
    } else {
      console.error("Document does not exist.");
    }
  } catch (error) {
    console.error("ERROR setting offline data:", error);
  }

  return false;
}

export async function updateOrdersForAttendant(
  attendantName: string,
  orderId: string
) {
  try {
    // Reference to the Firestore document containing staff info
    const docRef = doc(db, "vikumar.azad@gmail.com", "info");

    // Fetch the document to get the current staff data
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Document not found");
      return;
    }

    const staff = docSnap.data().staff;

    if (!staff) {
      console.error("Invalid staff data");
      return;
    }

    // Find the new attendant by name
    const newAttendantIndex = staff.findIndex(
      (staffMember: any) =>
        staffMember.name === attendantName && staffMember.role === "concierge"
    );

    if (newAttendantIndex === -1) {
      console.error("New Attendant not found");
      return;
    }

    // Find the previous attendant who had this order
    const previousAttendantIndex = staff.findIndex(
      (staffMember: any) =>
        staffMember.role === "concierge" &&
        staffMember.orders?.includes(orderId)
    );

    // Modify the staff array
    if (newAttendantIndex !== -1) {
      // Add the orderId to the new attendant's orders
      staff[newAttendantIndex].orders = staff[newAttendantIndex].orders || [];
      staff[newAttendantIndex].orders.push(orderId);
    }

    // Remove the orderId from the previous attendant's orders if found
    if (
      previousAttendantIndex !== -1 &&
      previousAttendantIndex !== newAttendantIndex
    ) {
      staff[previousAttendantIndex].orders = staff[
        previousAttendantIndex
      ].orders.filter((id: string) => id !== orderId);
    }

    // Update the document with the modified staff array
    // console.log("staff", staff);
    await updateDoc(docRef, {
      staff: staff,
    });

    console.log("Order attendant updated successfully");
  } catch (error) {
    console.error("Error updating orders: ", error);
  }
}
