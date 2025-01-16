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
import Script from "next/script";
import { createServiceUpdateOrder } from "../utils/servicesApi";

interface RoomOption {
  name: string;
  currentPrice: number;
  updatedPrice: number;
}

export default function RoomUpgrades({ data, flag }: any) {
  console.log("RoomUpgrades", data);
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null);
  const [loadScript, setLoadScript] = useState(false);

  const handleUpgrade = () => {
    console.log("clicked");
    if (selectedRoom) {
      setLoadScript(true);
      console.log("Selected room upgrade:", selectedRoom);
      createServiceUpdateOrder(selectedRoom);
    } else {
      setLoadScript(false);
    }
  };

  return (
    <div>
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

      <div className="max-w-2xl mx-auto p-4">
        <Card className="w-2xl max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{data.roomupgrades[0].typeName}</CardTitle>
            <CardDescription>
              {data.roomupgrades[0].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select
                onValueChange={(value) =>
                  setSelectedRoom(
                    data.roomupgrades[0].availableOptions.find(
                      (option: any) => option.name === value
                    ) || null
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a room type" />
                </SelectTrigger>
                <SelectContent>
                  {data.roomupgrades[0].availableOptions.map((option: any) => (
                    <SelectItem key={option.name} value={option.name}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedRoom && (
                <div className="space-y-2">
                  <p>Current Price: ₹{selectedRoom.currentPrice} /night</p>
                  <p>Upgrade Price: ₹{selectedRoom.updatedPrice} /night</p>
                  <p className="font-semibold">
                    You save: ₹
                    {selectedRoom.currentPrice - selectedRoom.updatedPrice}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleUpgrade}
              disabled={!selectedRoom}
            >
              Pay to Upgrade
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
