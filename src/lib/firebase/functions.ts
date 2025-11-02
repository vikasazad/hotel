import { db } from "@/config/db/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export function getHotelDataLive(
  roomNo: string,
  email: string,
  callback: (data: any) => void
) {
  const docRefMenu = doc(db, email, "hotel");
  const docRefInfo = doc(db, email, "info");

  try {
    // Set up listeners for both documents
    const unsubscribeMenu = onSnapshot(docRefMenu, (docSnapMenu) => {
      const unsubscribeInfo = onSnapshot(docRefInfo, (docSnapInfo) => {
        if (!docSnapMenu.exists() || !docSnapInfo.exists()) {
          callback({
            hotel: false,
            info: false,
          });
          return;
        }

        const hotelData = docSnapMenu.data().live;
        const infoData = docSnapInfo.data().hotel;
        const tax = docSnapInfo.data().business?.gstTax;

        // Find the room with matching phone number
        const matchingRoom = hotelData.rooms.find(
          (room: any) => room.bookingDetails?.location === roomNo
        );

        callback({
          hotel: matchingRoom || null,
          info: { infoData: infoData, tax: tax },
        });
      });

      // Return cleanup function
      return () => {
        unsubscribeInfo();
      };
    });

    // Return cleanup function for both listeners
    return () => {
      unsubscribeMenu();
    };
  } catch (error) {
    console.error("Error setting up real-time listener:", error);
    callback({
      hotel: false,
      info: false,
    });
    throw error;
  }
}
