"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "default";
  }
};

const servicesData = [
  {
    id: "ISS990112082024-202-1",
    title: "General Cleanliness",
    status: "completed",
    time: "11:09 AM",
    description:
      "The room was found with dust on the furniture, uncleaned floors, and an unpleasant odor. The bathroom has not been properly sanitized, and there are visible stains on the bedding.",
    type: "issue",
    icon: "blue",
  },
  {
    id: "ORD990112082024-202-1",
    title: "Grilled Chicken Sandwich",
    status: "pending",
    time: "08:29 PM",
    description:
      "A sandwich made with grilled chicken breast, fresh lettuce, tomatoes, and a tangy sauce, served with a side of fries.",
    type: "order",
    icon: "orange",
  },
  {
    id: "REQ990112082024-202-1",
    title: "Relaxing Swedish Massage",
    status: "rejected",
    time: "10:29 PM",
    description:
      "A 60-minute full-body Swedish massage focusing on relaxation and stress relief, using long gliding strokes, kneading, and deep circular movements to help relax and energize the body.",
    type: "request",
    icon: "purple",
  },
];

const Dashboard = () => {
  const router = useRouter();
  return (
    <>
      <Card className="w-full max-w-lg shadow-lg mb-4">
        <CardHeader className="space-y-2 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Hotel SunShine</h2>
              <div className="text-yellow-400">★★★★★</div>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-center px-4">
              <div className="text-2xl font-bold text-green-700">3</div>
              <div className="text-sm text-green-600">nights</div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
            <div>
              <div className="text-sm text-gray-500">CHECK IN</div>
              <div className="font-medium">13.02.2024</div>
            </div>
            <div className="text-green-700">to</div>
            <div>
              <div className="text-sm text-gray-500">CHECK OUT</div>
              <div className="font-medium">16.02.2024</div>
            </div>
            <Button
              variant="ghost"
              className="rounded-lg p-2 h-10 w-10 bg-green-100"
              onClick={() => router.push("/room")}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 px-4 pb-4">
          <Accordion type="single" collapsible className="w-full">
            {servicesData.map((service) => (
              <AccordionItem key={service.id} value={service.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Utensils className={`w-5 h-5 text-${service.icon}-500`} />
                    <span>{service.title}</span>
                    <Badge
                      variant={getBadgeVariant(service.status)}
                      className="ml-2"
                    >
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-500 ml-auto">
                      {service.time}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="font-medium">{service.id}</div>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="flex gap-2 mt-4">
                      {service.type === "issue" && (
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      )}
                      {service.type === "order" && (
                        <>
                          <Button variant="outline" size="sm">
                            Modify
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                          <Button variant="outline" size="sm">
                            Order Again
                          </Button>
                          <Button variant="default" size="sm">
                            Pay Now
                          </Button>
                        </>
                      )}
                      {service.type === "request" && (
                        <>
                          <Button variant="outline" size="sm">
                            Modify
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                          <Button variant="default" size="sm">
                            Pay Now
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
