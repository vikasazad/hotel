import { db } from "@/config/db/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { SignJWT } from "jose";
import { DateTime } from "luxon";
import { sendWhatsAppTextMessage } from "../../services/utils/servicesApi";

export async function createOrder({ location, customer, orderData, id }: any) {
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
          response.razorpay_payment_id,
          id
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
  paymentId: string,
  id: string
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
          if (room.diningDetails?.orders.length > 0 && id.startsWith("BOK")) {
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
          if (room.servicesUsed.length > 0 && id.startsWith("SE")) {
            room.servicesUsed = room.servicesUsed.map((service: any) => {
              if (service.serviceId === id) {
                return {
                  ...service,
                  serviceId: "paid",
                  payment: {
                    ...service.payment,
                    paymentStatus: "paid",
                    mode: "online",
                    paymentId: paymentId,
                    timeOfTransaction: new Date().toISOString(),
                    transctionId: orderId,
                    paymentType: "single",
                  },
                };
              }
              return service;
            });
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
  name: string,
  url: string
) {
  const encodedSecretKey = new TextEncoder().encode("Vikas@1234");

  const payload = {
    email,
    tableNo: roomNo,
    phone,
    name,
    tag: "hotel",
    tax: { gstPercentage: "" },
    home: url,
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
  console.log("user", user, service, info, time);
  const phoneNumber = await findStaff(user, "concierge");
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
  // console.log("phoneNumber", phoneNumber);
  if (phoneNumber) {
    const message = await sendMessageToAttendant(
      user,
      id,
      phoneNumber.contact,
      phoneNumber.name,
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
  } else {
    return false;
  }
}

async function findStaff(user: any, role: string) {
  const docRef = doc(db, user.email, "info");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data()?.staff;

  const staffMembers = data.filter((el: any) => el.role === role);
  if (staffMembers.length === 0) return false;
  return assignAttendantSequentially(staffMembers);
}
async function findStaffByRole(user: any, roles: string[]) {
  const docRef = doc(db, user.email, "info");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data()?.staff;

  const staffMembers = data.filter(
    (el: any) =>
      roles.includes(el.role) && el.status === "online" && el.active === true
  );
  if (staffMembers.length === 0) return false;

  // Sort staff by number of orders for each role
  const sortedStaff = assignAttendantSequentially(staffMembers);
  if (!sortedStaff) return false;

  // Get first staff member for each role
  const finalStaff = roles
    .map((role) => {
      const staffForRole = staffMembers.filter((el: any) => el.role === role);
      if (staffForRole.length === 0) return null;
      return assignAttendantSequentially(staffForRole);
    })
    .filter((staff) => staff !== null);

  return finalStaff;
}

interface StaffMember {
  name: string;
  contact: string;
  role: string;
  status: string;
  active: boolean;
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

export async function sendMessageToAttendant(
  user: any,
  id: string,
  phoneNumber: string,
  name: string,
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
        staffName: name,
        orderId: id,
        staffContact: phoneNumber,
        messageId,
        info: `${service} ${info}`,
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
    const businessEmail = assignment.businessEmail || "vikumar.azad@gmail.com";
    const assignmentRef = doc(
      db,
      businessEmail,
      "webhook",
      "assignments",
      assignment.orderId
    );

    const assignmentData = {
      ...assignment,
      status: assignment.status || "pending",
      timestamp: Date.now(),
    };

    await setDoc(assignmentRef, assignmentData);
    console.log("Pending assignment stored:", assignment.orderId);
  } catch (error) {
    console.error("Error storing pending assignment:", error);
  }
}

/**
 * Sends a WhatsApp Flow to a specific phone number
 * @param phoneNumber - The recipient's phone number (with country code)
 * @param flowData - Optional custom flow data, uses default if not provided
 * @returns Promise<boolean> - Success status of the operation
 */
export async function sendWhatsAppFlow(
  phoneNumber: string,
  guestName: string,
  roomNo: string
): Promise<boolean> {
  try {
    // Format phone number - remove any special characters and ensure proper format
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    console.log("Sending WhatsApp Flow to:", formattedPhone);

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
          recipient_type: "individual",
          to: formattedPhone,
          type: "template",
          template: {
            name: "feedback_message",
            language: { code: "en_US" },
            components: [
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: String(guestName),
                  },
                ],
              },
              {
                type: "button",
                sub_type: "quick_reply",
                index: "0",
                parameters: [
                  {
                    type: "text",
                    text: "I'm happy so far",
                  },
                ],
              },
              {
                type: "button",
                sub_type: "flow",
                index: "1",
                parameters: [
                  {
                    type: "action",
                    action: {
                      flow_token: roomNo,
                    },
                  },
                ],
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();

    if (response.ok && data.messages && data.messages[0]) {
      const messageId = data.messages[0].id;
      console.log("WhatsApp  sent successfully. Message ID:", messageId);
      return true;
    } else {
      console.error("Failed to send WhatsApp Flow:", data);
      throw new Error(data.error?.message || "Failed to send flow");
    }
  } catch (error: any) {
    console.error("WhatsApp  API Error:", error);
    return false;
  }
}

/**
 * Check if user has already responded to satisfaction prompt for this stay
 */
export async function hasUserRespondedToday(
  userEmail: string,
  roomNo: string
): Promise<boolean> {
  try {
    const docRef = doc(db, userEmail, "hotel");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return false;

    const data = docSnap.data()?.live?.rooms;
    if (!data) return false;

    const todayDate = new Date().toISOString().split("T")[0];

    // Use for...of loop to allow early return
    for (const room of data) {
      if (room.bookingDetails?.location === roomNo) {
        const feedbacks = room.bookingDetails?.feedback || [];

        // Use some() to check if any feedback matches today's date
        const hasRespondedToday = feedbacks.some((feedback: any) => {
          const feedbackDate = new Date(feedback.time)
            .toISOString()
            .split("T")[0];
          return todayDate === feedbackDate;
        });

        if (hasRespondedToday) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking satisfaction response:", error);
    return false;
  }
}

/**
 * Save satisfaction response to Firebase
 */
export async function saveSatisfactionResponse(
  userEmail: string,
  roomNo: string,
  feedbackData: any
): Promise<boolean> {
  try {
    const docRef = doc(db, userEmail, "hotel");
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return false;
    const data = docSnap.data()?.live?.rooms;
    const roomIndex = data?.findIndex(
      (el: any) => el.bookingDetails?.location === roomNo
    );
    if (roomIndex === -1) return false;
    const updatedData = [...data];

    if (!updatedData[roomIndex].bookingDetails.feedback) {
      updatedData[roomIndex].bookingDetails.feedback = [];
    }
    updatedData[roomIndex].bookingDetails.feedback.push(feedbackData);

    await updateDoc(docRef, {
      "live.rooms": updatedData,
    });

    return true;
  } catch (error) {
    console.error("Error saving satisfaction response:", error);
    return false;
  }
}

export async function getFeedbackSettings(hotelId: string) {
  try {
    const docRef = doc(db, hotelId, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const feedbackWindow = docSnap.data()?.business?.feedbackWindow || {};

      // Check if we're in production (Vercel deployment)
      const isProduction = process.env.WORK_ENV === "production";

      // Define hotel timezone (you can make this configurable later)
      const hotelTimezone = "Asia/Kolkata"; // IST timezone

      if (
        isProduction &&
        feedbackWindow.startTime !== undefined &&
        feedbackWindow.endTime !== undefined
      ) {
        // Convert hotel local time to UTC for production using Luxon
        const startTimeInHotel = DateTime.fromObject(
          { hour: feedbackWindow.startTime, minute: 0 },
          { zone: hotelTimezone }
        );
        const endTimeInHotel = DateTime.fromObject(
          { hour: feedbackWindow.endTime, minute: 0 },
          { zone: hotelTimezone }
        );

        // Convert to UTC
        const startTimeUTC = startTimeInHotel.toUTC();
        const endTimeUTC = endTimeInHotel.toUTC();

        return {
          startTime: startTimeUTC.hour,
          endTime: endTimeUTC.hour,
          originalStartTime: feedbackWindow.startTime,
          originalEndTime: feedbackWindow.endTime,
          timezone: hotelTimezone,
          debug: {
            startTimeISO: startTimeUTC.toISO(),
            endTimeISO: endTimeUTC.toISO(),
          },
        };
      }

      return feedbackWindow;
    }
  } catch (error) {
    console.error("Error fetching feedback settings from DB:", error);
    return false;
  }
}

export const getBusinessInfo = async (email: string) => {
  const docRef = doc(db, email, "info");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().business;
  }
  return false;
};

export async function handleUserCheckOut(user: any, roomNo: string) {
  try {
    const phoneNumbers: any = await findStaffByRole(user, [
      "attendant",
      "receptionist",
    ]);
    // console.log("phoneNumbers", phoneNumbers);
    if (phoneNumbers.length === 0) return false;
    // return phoneNumbers;
    const message = `Hey! Room No-${roomNo} has requested for check out. Please reachout to reception to get the check out done.`;
    phoneNumbers?.forEach(async (el: StaffMember) => {
      const messageSent = await sendWhatsAppTextMessage(el.contact, message);
      if (!messageSent) {
        console.error("Error sending message to attendant:", el.contact);
      }
    });
  } catch (error) {
    console.error("Error handling check out:", error);
    return false;
  }
}
