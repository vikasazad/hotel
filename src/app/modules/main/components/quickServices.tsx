"use client";

import { Paintbrush, UtensilsCrossed, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Paintbrush,
    name: "Cleaning",
    description: "Book a cleaning service",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: UtensilsCrossed,
    name: "Menu",
    description: "View our menu options",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Wrench,
    name: "Repair",
    description: "Request repair service",
    color: "from-cyan-500 to-blue-500",
  },
];

export default function QuickServices() {
  return (
    <Card className="w-full  overflow-hidden bg-gradient-to-br from-orange-50 to-rose-50 mb-[100px]">
      <CardHeader className="pb-0 pt-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Quick Services</CardTitle>
            <p className="text-muted-foreground">
              Select your service to get started
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          {services.map((service) => (
            <button
              key={service.name}
              className={`w-[100px] group relative overflow-hidden rounded-xl p-2 bg-gradient-to-br ${service.color}`}
            >
              <div className="absolute inset-0 bg-white opacity-90 transition-opacity group-hover:opacity-80" />
              <div className="relative ">
                <service.icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                <div className="space-y-2">
                  <h3 className="font-semibold tracking-tight text-lg">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
