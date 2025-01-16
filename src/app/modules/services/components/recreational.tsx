"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { createRecreationalOrder } from "../utils/servicesApi";
import Script from "next/script";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Recreational({ data, flag }: any) {
  const BookingData: any = useSelector(
    (state: RootState) => state.addBooking.bookingData
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loadScript, setLoadScript] = useState(false);

  const serviceOptions = selectedCategory ? data[selectedCategory] : [];

  const selectedServiceDetails = selectedService
    ? serviceOptions.find(
        (service: any) => service.typeName === selectedService
      )
    : null;
  const gstPercentage = "";
  console.log(
    "selectedService",
    selectedService,
    selectedCategory,
    selectedServiceDetails
  );
  const timeSlots = [];
  if (selectedServiceDetails) {
    const { startTime, endTime, duration } = selectedServiceDetails;

    // console.log("Service Details:", selectedServiceDetails);

    let currentTime = new Date(`2023-01-01T${startTime}:00`);
    const endDateTime = new Date(`2023-01-01T${endTime}:00`);

    // console.log("Start Time:", currentTime.toLocaleTimeString());
    // console.log("End Time:", endDateTime.toLocaleTimeString());

    const durationInMinutes =
      (duration?.hours || 0) * 60 + (duration?.minutes || 0);

    if (durationInMinutes <= 0) {
      // console.error("Invalid duration:", duration);
      throw new Error("Duration must be greater than 0 minutes.");
    }

    // console.log("Duration in Minutes:", durationInMinutes);

    while (currentTime < endDateTime) {
      // console.log("Current Time:", currentTime.toLocaleTimeString());

      const startSlot = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      currentTime = new Date(currentTime.getTime() + durationInMinutes * 60000);

      if (currentTime > endDateTime) {
        // console.log("Breaking loop as current time exceeds end time.");
        break;
      }

      const endSlot = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // console.log(`Adding Time Slot: ${startSlot} - ${endSlot}`);
      timeSlots.push(`${startSlot} - ${endSlot}`);
    }
  }

  // console.log("Generated Time Slots:", timeSlots);

  // console.log("Generated Time Slots:", timeSlots);

  const handleBooking = async () => {
    if (selectedCategory && selectedService && selectedTime) {
      setLoadScript(true);
      const _recreational = {
        category: selectedCategory,
        service: selectedService,
        time: selectedTime,
        details: selectedServiceDetails,
        location: BookingData.bookingDetails.location,
        gstPercentage,
      };
      console.log(_recreational);
      await createRecreationalOrder(_recreational);
      flag(false);
    } else {
      setLoadScript(false);
    }
  };

  return (
    <>
      {loadScript && (
        <Script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
      )}
      <Button variant="ghost" className="mt-2" onClick={() => flag(false)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="container mx-auto p-4 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Book a Recreational Service</CardTitle>
            <CardDescription>
              Select a service category, specific service, and time slot to book
              your recreational experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Category
              </label>
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(data).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specific Service
                </label>
                <Select onValueChange={(value) => setSelectedService(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a specific service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((service: any) => (
                      <SelectItem
                        key={service.typeName}
                        value={service.typeName}
                      >
                        {service.typeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedServiceDetails && (
              <div className="space-y-2">
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedServiceDetails.description}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {`${selectedServiceDetails.duration.hours || 0}h ${
                    selectedServiceDetails.duration.minutes || 0
                  }m`}
                </p>
                <p>
                  <strong>Price:</strong> ₹{selectedServiceDetails.price}
                </p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {selectedServiceDetails.startTime}
                </p>
                <p>
                  <strong>End Time:</strong> {selectedServiceDetails.endTime}
                </p>
              </div>
            )}

            {selectedServiceDetails && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Slot
                </label>
                <Select onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleBooking}
              disabled={!selectedCategory || !selectedService || !selectedTime}
            >
              Book and Pay Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
