"use client";

import React, { useState } from "react";
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
import Script from "next/script";
import { createPersonalShoppingOrder } from "../utils/servicesApi";

export default function PersonalShopping({ data, flag }: any) {
  console.log("DATA", data);
  const [selectedTour, setSelectedTour] = useState<string | undefined>(
    undefined
  );
  const [loadScript, setLoadScript] = useState(false);

  const handleBookAndPay = () => {
    if (selectedTour) {
      console.log("Selected tour:", data[selectedTour][0]);
      setLoadScript(true);
      createPersonalShoppingOrder(data[selectedTour][0]);
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
      <div className="container mx-auto p-4 mb-8">
        <h1 className="text-2xl font-bold mb-4">Book Personal Shopping Tour</h1>

        <Select onValueChange={setSelectedTour}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select tour type" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(data).map((tourType) => (
              <SelectItem key={tourType} value={tourType}>
                {tourType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedTour && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{selectedTour}</CardTitle>
              <CardDescription>
                {data[selectedTour][0].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <strong>Benefits:</strong> {data[selectedTour][0].benefits}
              </p>
              <p className="mb-2">
                <strong>Timeline:</strong> {data[selectedTour][0].timeline}
              </p>
              <p className="mb-2">
                <strong>Duration:</strong>{" "}
                {data[selectedTour][0].duration.hours}h{" "}
                {data[selectedTour][0].duration.minutes}m
              </p>
              <p className="mb-2">
                <strong>Start Time:</strong> {data[selectedTour][0].startTime}
              </p>
              <p className="mb-2">
                <strong>End Time:</strong> {data[selectedTour][0].endTime}
              </p>
              <p className="mb-2">
                <strong>Price:</strong> ${data[selectedTour][0].price}
              </p>
              <p className="mb-2">
                <strong>Booking Policy:</strong>{" "}
                {data[selectedTour][0].bookingPolicy}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBookAndPay} className="w-full">
                Book and Pay
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
