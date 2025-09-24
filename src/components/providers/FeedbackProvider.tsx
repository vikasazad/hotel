"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { setPopup } from "@/lib/features/popupSlice";
import {
  setHotelData,
  setHotelDataLoading,
} from "@/lib/features/hotelDataSlice";
import { addUser } from "@/lib/features/addToOrderSlice";
import { getHotelDataLive } from "@/lib/firebase/functions";
import { authenticateToken } from "@/app/modules/login/utils/login";
import FeedbackForm from "@/app/modules/main/components/feedbackForm";

export default function FeedbackProvider() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.addToOrderData.user);
  const popup = useSelector((state: RootState) => state.popup.popup);
  const hotelData = useSelector(
    (state: RootState) => state.hotelData.hotelData
  );
  const secretKey = "Vikas@1234";
  console.log("here in feedback provider");

  // Sync user data from localStorage to Redux if not already present
  useEffect(() => {
    if (!user?.token) {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          dispatch(addUser({ ...userData, token: storedToken }));
        } catch (error) {
          console.error("Error parsing stored user data:", error);
        }
      }
    }
  }, [user, dispatch]);

  // Check feedback eligibility on mount and user change
  useEffect(() => {
    async function checkFeedbackEligibility() {
      try {
        console.log("Checking feedback eligibility...");
        const res = await fetch("/api/feedbackCheck");
        const data = await res.json();
        console.log("Feedback check data:", data);

        if (data.showFeedbackPrompt) {
          console.log("Setting popup to true");
          dispatch(setPopup(true));
        }
      } catch (error) {
        console.error("Error checking feedback eligibility:", error);
      }
    }

    // Only check if user exists
    console.log("User in FeedbackProvider:", user);
    if (user?.token) {
      console.log("User has token, checking feedback eligibility");
      checkFeedbackEligibility();
    } else {
      console.log("No user token found, skipping feedback check");
    }
  }, [user, dispatch]);

  // Get hotel data when popup should be shown
  useEffect(() => {
    if (!popup || !user?.token) return;

    async function fetchHotelData() {
      try {
        dispatch(setHotelDataLoading(true));
        const decoded = await authenticateToken(user.token, secretKey);

        if (decoded?.payload?.roomNo && decoded?.payload?.email) {
          // Set up real-time listener for hotel data
          const unsubscribe = getHotelDataLive(
            decoded.payload.roomNo as string,
            decoded.payload.email as string,
            (newData) => {
              dispatch(setHotelData(newData.hotel));
              dispatch(setHotelDataLoading(false));
            }
          );

          return () => unsubscribe();
        } else {
          dispatch(setHotelDataLoading(false));
        }
      } catch (error) {
        console.error("Error fetching hotel data for feedback:", error);
        dispatch(setHotelDataLoading(false));
      }
    }

    fetchHotelData();
  }, [popup, user, secretKey, dispatch]);

  // Debug logging
  console.log("FeedbackProvider render state:", {
    popup,
    hotelData: !!hotelData,
    userToken: !!user?.token,
  });

  // Only render feedback form if popup is true and we have hotel data
  if (!popup || !hotelData) {
    return null;
  }

  return <FeedbackForm hotelData={hotelData} email={user.email} />;
}
