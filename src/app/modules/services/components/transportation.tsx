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
import { ArrowLeft, IndianRupee } from "lucide-react";
import Script from "next/script";
import { createTransportationOrder } from "../utils/servicesApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Transportation({ data, flag }: any) {
  console.log("DATA", data);
  const BookingData: any = useSelector(
    (state: RootState) => state.addBooking.bookingData
  );
  console.log("BookingData", BookingData);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const serviceTypes = Object.keys(data);
  const [loadScript, setLoadScript] = useState(false);

  const handleBookAndPay = async () => {
    if (selectedService) {
      console.log("Selected tour:", data[selectedService][0]);
      setLoadScript(true);
      await createTransportationOrder(data[selectedService][0]);
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Book Transportation Services
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Select a Service</CardTitle>
            <CardDescription>
              Choose from our available transportation options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedService}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedService && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">
                  {data[selectedService][0].typeName}
                </h2>
                <p className="mb-2">{data[selectedService][0].description}</p>
                <ul className="list-disc list-inside mb-2">
                  <li className="flex items-center ">
                    Price: <IndianRupee className="w-4 h-4" />
                    {data[selectedService][0].price}
                  </li>
                  <li>Duration: {data[selectedService][0].duration}</li>
                  <li>
                    Booking Policy: {data[selectedService][0].bookingPolicy}
                  </li>
                  {data[selectedService][0].includedItems && (
                    <li>
                      Included Items: {data[selectedService][0].includedItems}
                    </li>
                  )}
                  {data[selectedService][0].airportList && (
                    <li>
                      Airports:{" "}
                      {data[selectedService][0].airportList.join(", ")}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleBookAndPay}
              disabled={!selectedService}
              className="w-full"
            >
              Book and Pay
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
