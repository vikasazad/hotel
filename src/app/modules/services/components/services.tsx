"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bed,
  Activity,
  Briefcase,
  Car,
  ShoppingBag,
  Shirt,
  FlagIcon,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();
  const services = [
    {
      title: "Room Upgrades",
      icon: Bed,
      description: "Enhance your stay with premium room options",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Wellness",
      icon: Activity,
      description: "Spa, fitness, and wellness services",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Business",
      icon: Briefcase,
      description: "Business center and meeting facilities",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Transportation",
      icon: Car,
      description: "Airport transfers and local transportation",
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Personal Shopping",
      icon: ShoppingBag,
      description: "Personalized shopping assistance",
      color: "bg-pink-500/10 text-pink-500",
    },
    {
      title: "Laundry and Dry Cleaning",
      icon: Shirt,
      description: "Professional cleaning services",
      color: "bg-teal-500/10 text-teal-500",
    },
    {
      title: "Tours",
      icon: FlagIcon,
      description: "Personalized shopping assistance",
      color: "bg-pink-500/10 text-pink-500",
    },
  ];

  return (
    <>
      <Button variant="ghost" className="mt-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="w-full max-w-4xl mx-auto px-6 py-4 space-y-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground text-lg">
            What kind of services do you want?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <CardContent className="p-3">
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color} transition-transform group-hover:scale-110`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
