import { db } from "@/config/db/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SignJWT } from "jose";

export async function createOrder() {
  const res = await fetch("/api/createOrder", {
    method: "POST",
    body: JSON.stringify({ amount: 100 * 100 }),
  });
  const data = await res.json();

  const paymentData = {
    key: process.env.RAZORPAY_API_KEY,
    order_id: data.id,
    name: "Rosier",
    description: "Thank you",
    image: "",
    prefill: {
      name: "8851280284",
      contact: "8851280284",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#121212",
    },
    handler: async function (response: any) {
      // verify payment
      const res = await fetch("/api/verifyOrder", {
        method: "POST",
        body: JSON.stringify({
          orderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        }),
      });
      const data = await res.json();
      console.log("HERE", data, {
        orderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      });
      if (data.isOk) {
        // sendOrder(orderData, token, "Justin");
        // sendNotification(
        //   "f5WtuYAa4fi-Gbg8VSCVub:APA91bEh6W51Od84BARGVCh6Dc475Hqw3nefZncWNFPoT92yaJ4ouaorlliinGnaJu3v202sYHmegcSxURwxOpbbHyaWouYOUuDyLaZ5wlpPSDBl02me5Hs",
        //   "New Order Received",
        //   "Hi [Waiter Name], a new order has been placed at Table [Table Number]. Please review the details and ensure prompt service. Thank you!"
        // );
      } else {
        alert("Payment failed");
      }
    },
  };

  const payment = new (window as any).Razorpay(paymentData);
  payment.open();
}

export async function cancelOrder(orderId: string, roomNo: string) {
  try {
    // Reference to the Firestore document
    console.log("orderId: string, roomNo", orderId, roomNo);
    const docRef = doc(db, "vikumar.azad@gmail.com", "hotel");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Document does not exist.");
      return false;
    }

    const data = docSnap.data().live.rooms;

    if (!data) {
      console.error("Rooms data is missing in Firestore document.");
      return false;
    }

    // Locate the specific room based on roomNo
    const updatedData = data.map((room: any) => {
      if (room.bookingDetails?.location === roomNo) {
        // Update the status in servicesUsed if orderId starts with 'SE'
        if (orderId.startsWith("SE")) {
          console.log("h1");
          const updatedServices = room.servicesUsed.map((service: any) => {
            console.log("service", service);
            if (service.serviceId === orderId) {
              return {
                ...service,
                status: "Cancelled",
              };
            }
            return service;
          });
          return {
            ...room,
            servicesUsed: updatedServices,
          };
        }

        // Update the status in issuesReported if orderId starts with 'IS'
        if (orderId.startsWith("IS")) {
          const updatedIssues = { ...room.issuesReported };
          // console.log("updatedIssues", updatedIssues);
          if (updatedIssues) {
            Object.values(updatedIssues).map((el: any) => {
              if (el.issueId === orderId) {
                updatedIssues[el.name].status = "Cancelled";
                //  el.status === "Cancelled"
              }
              // console.log("updatedIssues", updatedIssues);
            });
            // updatedIssues[orderId].status = "Cancelled";
          }
          return {
            ...room,
            issuesReported: updatedIssues,
          };
        }
      }
      return room;
    });

    // console.log("first", updatedData);

    // Save the updated data back to Firestore
    await updateDoc(docRef, {
      "live.rooms": updatedData,
    });

    console.log("Order successfully cancelled and data updated in Firestore.");
    return true;
  } catch (error) {
    console.error("Error cancelling the order:", error);
    return false;
  }
}

export async function generateToken(
  email: string,
  roomNo: string,
  phoneNumber: string
) {
  const encodedSecretKey = new TextEncoder().encode("Vikas@1234");

  const payload = {
    email,
    tableNo: roomNo,
    phoneNumber,
    tag: "hotel",
    tax: { gstPercentage: "" },
  };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedSecretKey);
  return token;
}
