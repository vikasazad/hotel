"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import IssuesDialog from "./issuesDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  hasUserRespondedToday,
  saveSatisfactionResponse,
} from "../utils/mainAPI";
import { setPopup } from "@/lib/features/popupSlice";

export default function FeedbackForm({ hotelData, email }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const popup = useSelector((state: RootState) => state.popup.popup);
  // console.log("popup", popup);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [issuesDialog, setIssuesDialog] = useState(false);
  const [orderIds, setOrderIds] = useState<string[]>([]);

  const createOrderIds = () => {
    const orderIds: string[] = [];
    if (hotelData) {
      if (hotelData?.bookingDetails?.location) {
        orderIds.push(hotelData?.bookingDetails?.bookingId);
      }
      if (hotelData?.diningDetails?.orders) {
        hotelData?.diningDetails?.orders?.forEach((order: any) => {
          orderIds.push(order.orderId);
        });
      }

      if (hotelData?.servicesUsed) {
        hotelData?.servicesUsed?.forEach((service: any) => {
          orderIds.push(service.serviceId);
        });
      }
    }
    return orderIds;
  };

  const handleResponse = async (rating: "great" | "okay" | "not_good") => {
    if (rating === "okay" || rating === "not_good") {
      setOrderIds(createOrderIds());
      setIssuesDialog(true);
      return;
    } else {
      console.log("Rating", rating);
      setIsLoading(true);

      await saveSatisfactionResponse(email, hotelData.bookingDetails.location, {
        rating,
        time: new Date().toISOString(),
      });
      setIsOpen(false);
      setIsLoading(false);
      dispatch(setPopup(false));
    }
  };

  const feedback = async (response: any) => {
    console.log("Feedback Response:", response);
    await saveSatisfactionResponse(
      email,
      hotelData.bookingDetails.location,
      response
    );
    setIssuesDialog(false);
    setIsOpen(false);
    dispatch(setPopup(false));
  };

  const guestName = hotelData?.bookingDetails?.customer?.name || "Guest";

  const checkHasResponded = async () => {
    if (popup) {
      // console.log("here");
      const hasResponded = await hasUserRespondedToday(
        email,
        hotelData.bookingDetails.location
      );
      // console.log("hasResponded", hasResponded);
      if (hasResponded) {
        setIsOpen(false);
        return;
      } else {
        setIsOpen(true);
      }
    }
  };

  if (popup) {
    checkHasResponded();
  }

  return (
    <>
      {!issuesDialog ? (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="w-[95vw] max-w-md  sm:mx-auto rounded-xl">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-center text-lg sm:text-xl">
                Hi {guestName}! 👋
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-sm sm:text-base leading-relaxed px-2">
                Hope you&apos;re settling in well! How&apos;s everything so far?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="flex flex-col items-center gap-3 pt-4">
              <Button
                onClick={() => handleResponse("great")}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base"
                size="lg"
              >
                <span className="flex items-center justify-center gap-2 flex-wrap text-center">
                  <span>😀 Great</span>
                  <span className="hidden xs:inline">→</span>
                  <span className="text-xs sm:text-sm opacity-90">
                    I&apos;m happy so far
                  </span>
                </span>
              </Button>

              <Button
                onClick={() => handleResponse("okay")}
                disabled={isLoading}
                variant="outline"
                className="w-full border-yellow-400 text-yellow-600 hover:bg-yellow-50 text-sm sm:text-base"
                size="lg"
              >
                <span className="flex items-center justify-center gap-2 flex-wrap text-center">
                  <span>😐 Okay</span>
                  <span className="hidden xs:inline">→</span>
                  <span className="text-xs sm:text-sm opacity-90">
                    It&apos;s fine, but could be better
                  </span>
                </span>
              </Button>

              <Button
                onClick={() => handleResponse("not_good")}
                disabled={isLoading}
                variant="outline"
                className="w-full border-red-400 text-red-600 hover:bg-red-50 text-sm sm:text-base"
                size="lg"
              >
                <span className="flex items-center justify-center gap-2 flex-wrap text-center">
                  <span>☹️ Not good</span>
                  <span className="hidden xs:inline">→</span>
                  <span className="text-xs sm:text-sm opacity-90">
                    I faced some issues
                  </span>
                </span>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <IssuesDialog orderIds={orderIds} feedback={feedback} />
      )}
    </>
  );
}
