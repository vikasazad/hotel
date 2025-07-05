import { db } from "@/config/db/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export function calculateTotal(ordereditems: any) {
  return ordereditems.reduce((total: any, item: any) => {
    const price = item.item.price[item.selectedType];
    return total + price * item.count;
  }, 0);
}
export function calculateTax(total: any, tax: string) {
  const rounded = Math.round((total * Number(tax)) / 100);
  return rounded;
}

export async function getServices() {
  const docRef = doc(db, "vikumar.azad@gmail.com", "hotel");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { services: docSnap.data().services?.categories };
  } else {
    return { data: null, subCollection: "hotel" };
  }
}

export async function createServiceUpdateOrder(upgradeData: any) {
  const res = await fetch("/api/createOrder", {
    method: "POST",
    body: JSON.stringify({ amount: Number(upgradeData.updatedPrice) * 100 }),
  });
  const data = await res.json();

  const paymentData = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
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
export async function createWellnessOrder(wellnessData: any) {
  const res = await fetch("/api/createOrder", {
    method: "POST",
    body: JSON.stringify({ amount: Number(wellnessData.details?.price) * 100 }),
  });
  const data = await res.json();

  const paymentData = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
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
        const attendant: any = await getOnlineStaffFromFirestore(
          "vikumar.azad@gmail.com"
        );
        console.log("attendant", attendant);
        setWellness(wellnessData, attendant);

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

export async function setWellness(data: any, assignedAttendant: any) {
  console.log("data", data);
  console.log("attendant", assignedAttendant);
  const newOrderId = `SE:${data.location}:${new Date().toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  )}`;
  const newService = {
    serviceId: newOrderId,
    serviceName: data.details?.typeName,
    startTime: data.details?.startTime,
    endTime: data.details?.endTime,
    price: parseFloat(data.details?.price),
    attendant: assignedAttendant ? assignedAttendant.name : "Unassigned",
    attendantToken: assignedAttendant
      ? assignedAttendant.notificationToken
      : "",
    status: "requested",
    timeOfRequest: new Date().toISOString(),
    time: data.time,
    payment: {
      discount: {
        type: "none",
        amount: 0,
        code: "",
      },
      gst: {
        gstAmount: data.details?.gstPercentage
          ? calculateTax(data.details?.price, data.details?.gstPercentage)
          : "",
        gstPercentage: data.details?.gstPercentage || "",
        cgstAmount: "",
        cgstPercentage: "",
        sgstAmount: "",
        sgstPercentage: "",
      },
      subtotal: data.details?.price,
      mode: "",
      paymentId: "",
      paymentStatus: "pending",
      price: data.details?.gstPercentage
        ? data.details?.price +
          calculateTax(data.details?.price, data.details?.gstPercentage)
        : data.details?.price,
      priceAfterDiscount: "",
      timeOfTransaction: "",
      transctionId: "",
    },
  };

  const sanitizedFormat = JSON.parse(
    JSON.stringify(newService, (key, value) =>
      value === undefined ? null : value
    )
  );

  // const token = roomData[index]?.diningDetails.customer.notificationToken;
  // if (token) {
  //   console.log("token", token);
  //   sendNotification(
  //     token,
  //     "Item Added to Order!",
  //     "Hi, the item you requested has been added to your order and will be served shortly. Thank you for your patience!"
  //   );
  // }

  // const data = await setOfflineItem(updatedTableData);
  console.log("UPDATED", newService);
  setOfflineRoom(sanitizedFormat, data.location);
  updateOrdersForAttendant(assignedAttendant.name, newOrderId);
  await sendWhatsAppTextMessage(
    assignedAttendant.contact,
    `Service ${newOrderId} assigned to you, Please reachout to reception to get the service delivered.`
  );
}

export async function createRecreationalOrder(recreational: any) {
  const res = await fetch("/api/createOrder", {
    method: "POST",
    body: JSON.stringify({ amount: Number(recreational.details?.price) * 100 }),
  });
  const data = await res.json();

  const paymentData = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
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
        const attendant: any = await getOnlineStaffFromFirestore(
          "vikumar.azad@gmail.com"
        );
        setWellness(recreational, attendant);

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

export async function createTransportationOrder(transportation: any) {
  const res = await fetch("/api/createOrder", {
    method: "POST",
    body: JSON.stringify({ amount: Number(transportation.price) * 100 }),
  });
  const data = await res.json();

  const paymentData = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
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
        const attendant: any = await getOnlineStaffFromFirestore(
          "vikumar.azad@gmail.com"
        );
        setWellness(transportation, attendant);

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
export async function createPersonalShoppingOrder(personalShopping: any) {
  const res = await fetch("/api/createOrder", {
    method: "POST",
    body: JSON.stringify({ amount: Number(personalShopping.price) * 100 }),
  });
  const data = await res.json();

  const paymentData = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
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
        contact: staffMember.contact,
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

export async function setOfflineRoom(newService: any, location: any) {
  try {
    const docRef = doc(db, "vikumar.azad@gmail.com", "hotel");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().live.rooms;

      if (!data) {
        console.error("Data is missing in tableData");
        return false;
      }

      const updatedData = data.map((item: any) => {
        if (item.bookingDetails?.location === location) {
          // Merge the newService into servicesUsed or create the array if it doesn't exist
          const updatedServices = item.servicesUsed
            ? [...item.servicesUsed, newService]
            : [newService];

          return {
            ...item,
            servicesUsed: updatedServices,
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

export async function sendWhatsAppTextMessage(
  phoneNumber: string,
  message: string
) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v22.0/616505061545755/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "text",
          text: { body: message },
        }),
      }
    );

    await response.json();
    return response.ok;
  } catch (error) {
    console.error("Error sending WhatsApp text message:", error);
    return false;
  }
}
