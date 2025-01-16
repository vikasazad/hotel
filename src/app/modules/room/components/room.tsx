"use client";
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
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function RoomDetail() {
  const router = useRouter();
  const BookingData: any = useSelector(
    (state: RootState) => state.addBooking.bookingData
  );
  console.log("BookingData", BookingData);

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
              {BookingData?.bookingDetails?.images?.map(
                (src: any, index: number) => (
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
                )
              )}
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
              <h2 className="text-2xl font-bold">
                {BookingData.bookingDetails.roomType.toUpperCase()}
              </h2>
              <p className="text-gray-500 text-sm">
                {BookingData.bookingDetails.description}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-center px-4">
              <div className="text-2xl font-bold text-green-700">
                {BookingData.bookingDetails.nights}
              </div>
              <div className="text-sm text-green-600">nights</div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
            <div>
              <div className="text-sm text-gray-500">CHECK IN</div>
              <div className="font-medium">
                {new Date(
                  BookingData.bookingDetails.checkIn
                ).toLocaleDateString("en-GB")}
              </div>
            </div>
            <div className="text-green-700">to</div>
            <div>
              <div className="text-sm text-gray-500">CHECK OUT</div>
              <div className="font-medium">
                {new Date(
                  BookingData.bookingDetails.checkOut
                ).toLocaleDateString("en-GB")}
              </div>
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
                      <span className="text-black">
                        {BookingData.bookingDetails.noOfGuests}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Booking ID</span>
                  </div>
                  <span className="font-mono text-sm">
                    {BookingData.bookingDetails.bookingId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center mr-4">
                    <span className="font-medium">Inclusions</span>
                  </div>
                  <span className="font-mono text-sm text-right">
                    {BookingData.bookingDetails.inclusions.join(", ")}
                  </span>
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
                    {`Room (${BookingData.bookingDetails.nights} night × ${BookingData.bookingDetails.noOfGuests} guests)`}
                  </span>
                  <span className="font-medium">
                    ₹{BookingData.bookingDetails.payment.subtotal}
                  </span>
                </div>
                {BookingData.bookingDetails.payment.gst.gstPercentage && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {`Tax (${BookingData.bookingDetails.payment.gst.gstPercentage}%)`}
                    </span>
                    <span className="font-medium">
                      ₹{BookingData.bookingDetails.payment.gst.gstAmount}
                    </span>
                  </div>
                )}
                {BookingData.bookingDetails.payment.discount.type && (
                  <div className="flex items-center justify-between text-green-600">
                    <span className="text-sm">
                      Coupon{" "}
                      <span className="text-black">
                        ( {BookingData.bookingDetails.payment.discount.code} )
                      </span>
                    </span>
                    <span className="font-medium">
                      -₹{BookingData.bookingDetails.payment?.discount?.amount}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <span className="text-lg font-semibold">Total</span>
                {BookingData.bookingDetails.payment.paymentStatus === "paid" ? (
                  <>
                    <Badge variant="outline" className="mx-2">
                      Paid
                    </Badge>
                    <Badge variant="outline" className="mx-2">
                      {BookingData.bookingDetails.payment.mode}
                    </Badge>
                  </>
                ) : (
                  <Badge variant="outline" className="mx-2">
                    Pending
                  </Badge>
                )}
              </div>
              <span className="text-green-600 text-lg font-semibold">
                ₹{BookingData.bookingDetails.payment.price}
              </span>
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
