"use client";

import { Droplets, Shirt, Wrench, Bed, Timer } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { handleServiceRequest } from "../utils/mainAPI";

const services = [
  {
    icon: Droplets,
    name: "Water",
    border: "border-blue-300",
    bg: "bg-blue-50",
  },
  {
    icon: Shirt,
    name: "Toiletries",
    border: "border-purple-200",
    bg: "bg-purple-50",
  },
  {
    icon: Wrench,
    name: "Technical Assistance",
    border: "border-orange-200",
    bg: "bg-orange-50",
  },
  {
    icon: Bed,
    name: "Housekeeping",
    border: "border-green-200",
    bg: "bg-green-50",
  },
];

export default function QuickServices({ user, requests }: any) {
  console.log(user);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [waterSize, setWaterSize] = useState("");
  const [toiletry, setToiletry] = useState("");
  const [assistance, setAssistance] = useState("");
  const [housekeepingType, setHousekeepingType] = useState("urgent");
  const [housekeepingTime, setHousekeepingTime] = useState("");

  const handleOpen = (service: any) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleSubmit = async (service: string, info: string, time?: string) => {
    const res = await handleServiceRequest(user, service, info, time);
    console.log(res);
  };

  const renderDrawerContent = () => {
    switch (selectedService?.name) {
      case "Water":
        return (
          <>
            <DrawerHeader>
              <DrawerTitle>Request Water</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription> </DrawerDescription>
            <div className="my-4">
              <Select value={waterSize} onValueChange={setWaterSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select bottle size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500ml">500ml</SelectItem>
                  <SelectItem value="1L">1L</SelectItem>
                  <SelectItem value="2L">2L</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DrawerFooter>
              <Button
                className="w-full"
                onClick={() => waterSize && handleSubmit("Water", waterSize)}
              >
                Submit Request
              </Button>
            </DrawerFooter>
          </>
        );
      case "Toiletries":
        return (
          <>
            <DrawerHeader>
              <DrawerTitle>Request Toiletries</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription> </DrawerDescription>

            <div className="my-4">
              <Select value={toiletry} onValueChange={setToiletry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select toiletry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Soap">Soap</SelectItem>
                  <SelectItem value="Shampoo">Shampoo</SelectItem>
                  <SelectItem value="Toothpaste">Toothpaste</SelectItem>
                  <SelectItem value="Toothbrush">Toothbrush</SelectItem>
                  <SelectItem value="Comb">Comb</SelectItem>
                  <SelectItem value="Shaving Kit">Shaving Kit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DrawerFooter>
              <Button
                className="w-full"
                onClick={() => toiletry && handleSubmit("Toiletries", toiletry)}
              >
                Submit Request
              </Button>
            </DrawerFooter>
          </>
        );
      case "Technical Assistance":
        return (
          <>
            <DrawerHeader>
              <DrawerTitle>Technical Assistance</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription> </DrawerDescription>

            <div className="my-4">
              <Select value={assistance} onValueChange={setAssistance}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select assistance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronic Gadget">
                    Electronic Gadget Assistance
                  </SelectItem>
                  <SelectItem value="AC">How to use AC</SelectItem>
                  <SelectItem value="TV">How to use TV</SelectItem>
                  <SelectItem value="Fan">Fan Speed Adjustment</SelectItem>
                  <SelectItem value="Plumbing">Plumbing Issue</SelectItem>
                  <SelectItem value="Electricity">Electricity Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DrawerFooter>
              <Button
                className="w-full"
                onClick={() =>
                  assistance && handleSubmit("Technical Assistance", assistance)
                }
              >
                Submit Request
              </Button>
            </DrawerFooter>
          </>
        );
      case "Housekeeping":
        return (
          <>
            <DrawerHeader>
              <DrawerTitle>Housekeeping</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription> </DrawerDescription>

            <div className="my-4">
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="housekeepingType"
                    value="urgent"
                    checked={housekeepingType === "urgent"}
                    onChange={() => setHousekeepingType("urgent")}
                  />
                  Urgent Need
                </label>
                {/* <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="housekeepingType"
                    value="schedule"
                    checked={housekeepingType === "schedule"}
                    onChange={() => setHousekeepingType("schedule")}
                  />
                  Schedule Housekeeping
                </label> */}
              </div>
              {housekeepingType === "schedule" && (
                <Select
                  value={housekeepingTime}
                  onValueChange={setHousekeepingTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1hr">Within 1 hour</SelectItem>
                    <SelectItem value="2hr">Within 2 hours</SelectItem>
                    <SelectItem value="3hr">Within 3 hours</SelectItem>
                    <SelectItem value="4hr">Within 4 hours</SelectItem>
                    <SelectItem value="evening">In the evening</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow morning</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <DrawerFooter>
              <Button
                className="w-full"
                onClick={() =>
                  housekeepingType &&
                  handleSubmit(
                    "Housekeeping",
                    housekeepingType,
                    housekeepingTime
                  )
                }
              >
                Submit Request
              </Button>
            </DrawerFooter>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Quick Services</h2>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <Drawer
            key={service.name}
            open={open && selectedService?.name === service.name}
            onOpenChange={setOpen}
          >
            <DrawerTrigger asChild>
              <button
                className={`flex flex-col items-center justify-center h-20 rounded-xl border-2 ${service.border} ${service.bg} transition-shadow hover:shadow-md w-full`}
                onClick={() => handleOpen(service)}
              >
                <service.icon className="h-6 w-6 mb-2" />
                <span className="font-medium text-base">{service.name}</span>
              </button>
            </DrawerTrigger>
            <DrawerContent className="max-w-lg mx-auto px-4">
              {renderDrawerContent()}
            </DrawerContent>
          </Drawer>
        ))}
      </div>
      {Object.keys(requests.bookingDetails.requests).length > 0 && (
        <div className="w-full space-y-4">
          <h2 className="text-xl font-bold my-4">Requests</h2>
          {Object.values(requests.bookingDetails.requests).map(
            (request: any) => (
              <div
                key={request.id}
                className="flex items-center justify-between border-b border-gray-200 pb-2"
              >
                <p className="text-sm text-gray-500">
                  {request.service} - {request.info}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">
                    {new Date(request.time).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>

                  {request.status === "requested" && (
                    <Timer className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
