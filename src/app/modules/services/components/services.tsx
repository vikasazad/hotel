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
  Cherry,
} from "lucide-react";
import { useRouter } from "next/navigation";
import RoomUpgrades from "./roomUpgrades";
import { useEffect, useState } from "react";
import Wellness from "./wellnes";
import Recreational from "./recreational";
import Transportation from "./transportation";
import PersonalShopping from "./personalShopping";
import Laundry from "./laundry";
import Tours from "./tours";

export default function Services({ data }: any) {
  const router = useRouter();
  const [serviceData, setServiceData] = useState<any>(true);
  const [categoryFlag, setCategoryFlag] = useState<boolean>(false);
  const [availableComponents, setAvailableComponent] = useState<any>();
  console.log("DATA", data.services);
  useEffect(() => {
    setServiceData(data.services);
  }, [data]);
  const handleCategoryFlag = (flag: boolean) => {
    setCategoryFlag(flag);
  };
  const categoryClick = (data: any) => {
    if (data) {
      components.map((item: any, i: number) => {
        if (data === item.id) {
          setCategoryFlag(true);
          setAvailableComponent(components[i]);
        }
      });
    }
  };
  const serviceArr = [
    {
      title: "Room upgrades",
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
      title: "Recreational",
      icon: Cherry,
      description: "Spa, fitness, and wellness services",
      color: "bg-red-500/10 text-red-500",
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
      title: "Laundry",
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
  const components = [
    {
      id: "Room upgrades",
      component: (
        <RoomUpgrades
          data={serviceData["Room upgrades"]}
          flag={handleCategoryFlag}
        />
      ),
    },
    {
      id: "Wellness",
      component: (
        <Wellness data={serviceData.Wellness} flag={handleCategoryFlag} />
      ),
    },
    {
      id: "Recreational",
      component: (
        <Recreational
          data={serviceData.Recreational}
          flag={handleCategoryFlag}
        />
      ),
    },
    {
      id: "Transportation",
      component: (
        <Transportation
          data={serviceData.Transportation}
          flag={handleCategoryFlag}
        />
      ),
    },
    {
      id: "Personal Shopping",
      component: (
        <PersonalShopping
          data={serviceData["Personal Shopping"]}
          flag={handleCategoryFlag}
        />
      ),
    },
    {
      id: "Laundry",
      component: (
        <Laundry data={serviceData.Laundry} flag={handleCategoryFlag} />
      ),
    },
    {
      id: "Tours",
      component: <Tours data={serviceData.Tours} flag={handleCategoryFlag} />,
    },
    // { id: "Business", component: <Business data={serviceData.Business} /> },
  ];

  return (
    <>
      {!categoryFlag && (
        <>
          <Button
            variant="ghost"
            className="mt-2"
            onClick={() => router.back()}
          >
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
              {Object.keys(data.services)
                .sort()
                .map((serviceKey) => {
                  const matchedService = serviceArr.find(
                    (s) => s.title === serviceKey
                  );
                  if (!matchedService) return null;

                  const { icon: Icon, color, description } = matchedService;

                  return (
                    <Card
                      key={serviceKey}
                      onClick={() => categoryClick(serviceKey)}
                      className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      <CardContent className="p-3">
                        <div className="space-y-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} transition-transform group-hover:scale-110`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-xl">
                              {serviceKey}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </>
      )}

      {categoryFlag && <>{availableComponents.component}</>}
    </>
  );
}
