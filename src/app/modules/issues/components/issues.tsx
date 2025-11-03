"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  SprayCan,
  Settings,
  LockIcon,
  Tv,
  Sofa,
  AudioLines,
  Bug,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Issues() {
  const router = useRouter();
  const issues = [
    {
      title: "Cleanliness",
      icon: SprayCan,
      description: "Room or facility cleanliness concerns",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Functionality",
      icon: Settings,
      description: "Equipment or appliances not working properly",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Safety and Security",
      icon: LockIcon,
      description: "Security or safety related concerns",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Amenities",
      icon: Tv,
      description: "Missing or problematic room amenities",
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Aesthetics",
      icon: Sofa,
      description: "Room appearance or decor issues",
      color: "bg-pink-500/10 text-pink-500",
    },
    {
      title: "Noise",
      icon: AudioLines,
      description: "Noise disturbances or sound issues",
      color: "bg-teal-500/10 text-teal-500",
    },
    {
      title: "Services",
      icon: User,
      description: "Staff service or responsiveness concerns",
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      title: "Miscellaneous",
      icon: Bug,
      description: "Other issues not listed above",
      color: "bg-pink-500/10 text-pink-500",
    },
  ];

  return (
    <>
      <Button variant="ghost" className="mt-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="w-full max-w-4xl mx-auto px-6 pt-2 pb-6 space-y-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Issues</h2>
          <p className="text-muted-foreground text-lg">
            Please select what issue are you facing?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {issues.sort().map((issue) => (
            <Card
              key={issue.title}
              className="group  transition-all duration-200 cursor-pointer [box-shadow:var(--shadow-s)] py-1"
              onClick={() =>
                router.push(`issues/${issue.title.toLocaleLowerCase()}`)
              }
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-xl">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {issue.description}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${issue.color} transition-transform group-hover:scale-110 [box-shadow:var(--shadow-m)]`}
                  >
                    <issue.icon className="w-6 h-6" />
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
