"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, CreditCard, ArrowLeft, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RoomDetail() {
  const router = useRouter();
  const images = [
    "https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=",
    "https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg",
    "https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg",
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-2 p-6 mb-[60px]">
      {/* Room Details Card */}
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <Card className="overflow-hidden ">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={src}
                      alt={`Room view ${index + 1}`}
                      className="object-cover w-full h-full rounded-t-lg"
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <Badge className="absolute top-4 left-4 bg-white/90 text-primary hover:bg-white/80">
            Your Room
          </Badge>
        </div>
        <CardHeader className="space-y-2 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Hotel SunShine</h2>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Separator />

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Guests</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex">
                      <Users className="h-4 w-4 mr-2 " />
                      <span className="text-black">2</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Booking ID</span>
                  </div>
                  <span className="font-mono text-sm">HSS198791</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Price breakup</div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Room price for 1 night × 2 guests
                  </span>
                  <span className="font-medium">₹999</span>
                </div>
                <div className="flex items-center justify-between text-green-600">
                  <span className="text-sm">Coupon Discount</span>
                  <span className="font-medium">-₹999</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Total amount paid</div>
              <div className="text-lg font-semibold">₹999</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white rounded-lg shadow-md p-6">
        <CardTitle className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-800">Need help?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </CardTitle>
        <p className="text-gray-600 mb-6">
          If you need assistance, please contact our helpdesk.
        </p>
        <CardContent className="p-0">
          <a
            href={`tel:${8851280284}`}
            className="flex items-center justify-between"
          >
            <Phone className="h-5 w-5" />
            <span>Call helpdesk</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
