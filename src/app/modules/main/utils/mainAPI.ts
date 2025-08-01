import { db } from "@/config/db/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { SignJWT } from "jose";

export async function createOrder({ location, customer, orderData }: any) {
  const res = await fetch("/api/createOrder", {
    method: "POST",
    body: JSON.stringify({ amount: orderData?.payment?.price * 100 }),
  });
  const data = await res.json();

  const paymentData = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
    order_id: data.id,
    name: "Buildbility",
    description: "Thank you for your order",
    image: "",
    prefill: {
      name: customer?.name,
      contact: customer?.phone,
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
        sendHotelOrder(
          location,
          orderData,
          response.razorpay_order_id,
          response.razorpay_payment_id
        );
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

export async function sendHotelOrder(
  location: any,
  orderData: any,
  orderId: string,
  paymentId: string
) {
  console.log("HERE");

  const newTransaction = {
    location: location || "",
    against: orderData.orderId || "",
    attendant: orderData.attendant || "",
    attendantToken: orderData.attendantToken || "",
    bookingId: "",
    payment: {
      paymentStatus: "paid",
      mode: "online",
      paymentId: paymentId || "",
      timeOfTransaction: new Date().toISOString(),
      transctionId: orderId || "",
      price: orderData.payment.price || 0,
      subtotal: orderData.payment.subtotal || 0,
      priceAfterDiscount: "",
      paymentType: "single",
      gst: orderData.payment.gst,
      discount: orderData.payment.discount,
    },
  };

  const docRef = doc(db, "vikumar.azad@gmail.com", "hotel");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const rooms = data?.live?.rooms || [];

      let roomFound = false;

      // Iterate over rooms to find the matching location
      for (const room of rooms) {
        if (room.bookingDetails?.location === location) {
          roomFound = true;

          // Find and update the matching order's payment details
          if (room.diningDetails?.orders) {
            room.diningDetails.orders = room.diningDetails.orders.map(
              (order: any) => {
                if (order.orderId === orderData.orderId) {
                  return {
                    ...order,
                    payment: {
                      ...order.payment,
                      paymentStatus: "paid",
                      mode: "online",
                      paymentId: paymentId,
                      timeOfTransaction: new Date().toISOString(),
                      transctionId: orderId,
                      paymentType: "single",
                    },
                  };
                }
                return order;
              }
            );
          }

          // Add the new transaction
          room.transctions = [...(room.transctions || []), newTransaction];

          console.log(`Updates applied for location: ${location}`);
        }
      }

      if (!roomFound) {
        console.error(`No room found with location: ${location}`);
      }

      // Save the updated data back to Firestore
      await updateDoc(docRef, { "live.rooms": rooms });
      console.log("Data updated successfully.");
    } else {
      console.error("Document does not exist.");
    }
  } catch (error) {
    console.error("Error updating order:", error);
  }
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
  phone: string,
  name: string
) {
  const encodedSecretKey = new TextEncoder().encode("Vikas@1234");

  const payload = {
    email,
    tableNo: roomNo,
    phone,
    name,
    tag: "hotel",
    tax: { gstPercentage: "" },
  };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedSecretKey);
  return token;
}

export async function handleServiceRequest(
  user: any,
  service: string,
  info: string,
  time?: string
) {
  //send message to attendant
  //save the request in the database under bookingDetails
  const phoneNumber = await findSpecialAttendant(user);
  const randomStr = (n: number) =>
    [...Array(n)]
      .map(
        () =>
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
            Math.floor(Math.random() * 62)
          ]
      )
      .join("");
  const id = randomStr(6);
  if (phoneNumber) {
    const message = await sendMessageToAttendant(
      user,
      id,
      phoneNumber,
      service,
      info,
      time,
      user?.roomNo,
      user?.tag
    );
    if (!message) {
      console.log("Message not sent");
    }
    const docRef = doc(db, user.email, "hotel");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()?.live?.rooms;
    const room = data.find(
      (el: any) => el.bookingDetails?.location === user?.roomNo
    );
    console.log("room", room);
    if (room) {
      const roomIndex = data.findIndex(
        (el: any) => el.bookingDetails?.location === user?.roomNo
      );

      const updatedData = [...data];
      if (!updatedData[roomIndex].bookingDetails.requests) {
        updatedData[roomIndex].bookingDetails.requests = {};
      }

      updatedData[roomIndex].bookingDetails.requests[id] = {
        id,
        user,
        service,
        info,
        attendant: phoneNumber,
        time: new Date().toISOString(),
        status: "requested",
      };

      await updateDoc(docRef, {
        "live.rooms": updatedData,
      });
    }
    return true;
  }
}

async function findSpecialAttendant(user: any) {
  const docRef = doc(db, user.email, "info");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data()?.staff;

  const staff = data.find((el: any) => el.role === "specialattendant");
  return staff?.contact;
}

export async function sendMessageToAttendant(
  user: any,
  id: string,
  phoneNumber: string,
  service: string,
  info: string,
  time?: string,
  roomNo?: string,
  tag?: string
) {
  try {
    // Format phone number - remove any special characters and ensure proper format
    console.log("phoneNumber", phoneNumber);
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    let message = `Hey! Room No-${roomNo} made a ${tag}  request for ${service} ${info} `;
    if (time) {
      message = `Hey! Room No-${roomNo} made a ${tag}  request for ${service} ${info} at ${time}`;
    }

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
          to: formattedPhone,
          type: "interactive",
          interactive: {
            type: "button",
            body: {
              text: message,
            },
            action: {
              buttons: [
                {
                  type: "reply",
                  reply: {
                    id: `request_resolved_${id}`,
                    title: "Ok Request Resolved",
                  },
                },
              ],
            },
          },
        }),
      }
    );

    const data = await response.json();
    if (response.ok && data.messages && data.messages[0]) {
      const messageId = data.messages[0].id;

      // Store pending assignment with status
      await storePendingAssignment({
        staffName: "",
        orderId: id,
        staffContact: phoneNumber,
        messageId,
        timestamp: Date.now(),
        attemptCount: 1,
        customerName: "",
        roomNumber: roomNo,
        status: "pending",
        businessEmail: user.email, // Set the proper business email
      });

      console.log("initial pendingAssignments stored in database");

      // Set timeout using configurable duration

      return true;
    }

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to send message");
    }
  } catch (error: any) {
    console.error("WhatsApp API Error:", error);
    return false;
  }
}

async function storePendingAssignment(assignment: any) {
  try {
    // Store assignment as a field within the webhook document
    console.log("assignment", assignment);
    const businessEmail = assignment.businessEmail || "vikumar.azad@gmail.com";
    const docRef = doc(db, businessEmail, "webhook");

    // Get existing webhook document
    const docSnap = await getDoc(docRef);
    let existingAssignments = {};

    if (docSnap.exists()) {
      existingAssignments = docSnap.data() || {};
    }

    // Add the new assignment
    const updatedAssignments = {
      ...existingAssignments,
      [assignment.orderId]: {
        ...assignment,
        status: assignment.status || "pending",
        timestamp: Date.now(),
      },
    };

    await setDoc(docRef, updatedAssignments);
    console.log("Pending assignment stored:", assignment.orderId);
  } catch (error) {
    console.error("Error storing pending assignment:", error);
  }
}
