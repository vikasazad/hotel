"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";

import { ArrowRight, DoorOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { generateToken, handleUserCheckOut } from "../utils/mainAPI";
import { useDispatch } from "react-redux";
import { addData, addDiningLink } from "@/lib/features/bookingInfoSlice";
import { AppDispatch } from "@/lib/store";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import Link from "next/link";

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const decimal = rating % 1;
  const hasPartialStar = decimal > 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="w-4 h-4 fill-yellow-400 text-yellow-400"
      />
    );
  }

  // Add partial star if needed (e.g., 0.3, 0.7, 0.8, etc.)
  if (hasPartialStar) {
    const partialWidth = `${decimal * 100}%`;
    stars.push(
      <div key="partial" className="relative w-4 h-4">
        <Star className="absolute w-4 h-4 text-gray-300" />
        <div
          className="absolute overflow-hidden h-4"
          style={{ width: partialWidth }}
        >
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </div>
      </div>
    );
  }

  // Add empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="ml-1 text-sm text-yellow-400 font-semibold">
        {rating}
      </span>
    </div>
  );
};

const Dashboard = ({ user, hotel, info, email, tax }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(addData({ ...hotel, tax: tax }));

    generateToken(
      email,
      hotel?.bookingDetails?.location,
      hotel?.bookingDetails?.customer?.phone,
      hotel?.bookingDetails?.customer?.name,
      window.location.href
    ).then((data: string) => {
      if (data) {
        console.log(
          "data",
          `${process.env.NEXT_PUBLIC_BASE_URL}/login?token=${data}`
        );
        dispatch(
          addDiningLink(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login?token=${data}`
          )
        );
      }
    });
  }, [dispatch, hotel, email]);

  const handleCheckOut = async () => {
    await handleUserCheckOut(user, hotel?.bookingDetails?.location);
  };

  return (
    <>
      <Card
        className="w-full max-w-lg shadow-lg "
        data-onboarding="details-card"
      >
        <CardHeader className="space-y-2 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{info?.name}</h2>
              {info?.rating && <StarRating rating={info.rating} />}
              <p className="text-gray-500 text-sm">{info?.description}</p>
            </div>
            <div className="bg-green-100 px-3 py-2 rounded-lg text-center ">
              <div className="text-2xl font-bold text-green-700">
                {hotel?.bookingDetails?.nights}
              </div>
              <div className="text-sm text-green-600">
                {hotel?.bookingDetails?.nights === "1" ? "night" : "nights"}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg">
            <div>
              <div className="text-sm text-gray-500 font-bold">CHECK IN</div>
              <div className="font-medium">
                {new Date(hotel?.bookingDetails?.checkIn).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" }
                )}
              </div>
            </div>
            <div className="text-green-700">to</div>
            <div>
              <div className="text-sm text-gray-500 font-bold">CHECK OUT</div>
              <div className="font-medium">
                {new Date(hotel?.bookingDetails?.checkOut).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" }
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              className="rounded-lg p-2 h-10 w-10 bg-green-100 [box-shadow:var(--shadow-s)]"
              data-onboarding="room-info-button"
              onClick={() => {
                dispatch(addData(hotel));
                router.push("/room");
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <div
            className="w-full flex items-center justify-center  gap-2  py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold text-base rounded-lg [box-shadow:var(--shadow-l)]  hover:opacity-90 active:scale-95 transition-all"
            data-onboarding="checkout-button"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DoorOpen className="w-5 h-5" />
            Checking Out? Get 10% Off*
          </div>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="rounded-t-2xl bg-[#f0f0f0] ">
              <DrawerDescription></DrawerDescription>
              <DrawerHeader className="text-left pb-1 pt-1">
                <DrawerTitle className="text-md font-semibold">
                  Claim Your 10% Discount
                </DrawerTitle>
              </DrawerHeader>
              <div className="text-md text-gray-500 px-4 py-2">
                Share a quick review about your stay and enjoy 10% off your
                final bill. It only takes a minute — your feedback helps us
                improve your next visit!
              </div>
              <div className=" px-4 pb-4 ">
                <Button
                  variant="outline"
                  className="w-full mb-3"
                  onClick={() => {
                    handleCheckOut();
                  }}
                >
                  Skip for Now, Check Out
                </Button>
                <Link href={info.reviewLink} target="_blank">
                  <Button
                    variant="default"
                    className="w-full "
                    onClick={() => {
                      handleCheckOut();
                    }}
                  >
                    Share Feedback & Get 10% Off
                  </Button>
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </CardHeader>

        {/* <CardContent className="space-y-2 px-4 pb-4"> */}
        {/* {hotel?.diningDetails?.orders?.length > 0 &&
            hotel?.diningDetails?.orders.map((service: any) => (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={service.orderId}
              >
                <AccordionItem key={service.orderId} value={service.orderId}>
                  <AccordionTrigger className="hover:no-underline flex items-center justify-between">
                    <Utensils
                      className={`w-4 h-4 mr-1 text-${service.icon}-500`}
                    />
                    <span className="mr-3">{service.orderId}</span>
                    <Badge
                      variant={getBadgeVariant(service.status)}
                      className="ml-2"
                    >
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-500 ml-auto">
                      {new Date(service.timeOfRequest).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 p-2 rounded-lg">
                    <div className="space-y-2">
                      <div className="p-2 space-y-3">
                        <div className="">
                          {service.items.map((itm: any, id: number) => (
                            <div
                              key={id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex flex-col ">
                                <span className="font-medium text-lg">
                                  {itm.name}
                                </span>
                                <div className="flex items-center text-muted-foreground">
                                  <span className="font-normal mr-2">-</span>
                                  <span className="font-normal">
                                    {itm.quantity}
                                  </span>
                                </div>
                              </div>
                              <span className="text-green-600 font-medium">
                                ₹{Number(itm.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">Subtotal</span>
                          </div>
                          <span className="text-green-600 font-semibold">
                            ₹{service.payment.subtotal}
                          </span>
                        </div>
                        {service.payment.gst.gstPercentage && (
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{`Tax (${service.payment.gst.gstPercentage}%)`}</span>
                            </div>
                            <span className="text-green-600 font-semibold">
                              ₹{service.payment.gst.gstAmount}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">Total</span>
                            {service.payment.paymentStatus === "paid" ? (
                              <>
                                <Badge variant="outline" className="mx-2">
                                  Paid
                                </Badge>
                                <Badge variant="outline" className="mx-2">
                                  {service.payment.mode}
                                </Badge>
                              </>
                            ) : (
                              <Badge variant="outline" className="mx-2">
                                Pending
                              </Badge>
                            )}
                          </div>
                          <span className="text-green-600 font-semibold">
                            ₹{service.payment.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            disabled={service.payment.paymentStatus === "paid"}
                            onClick={() => handlePayment(hotel, service)}
                          >
                            {service.payment.paymentStatus === "pending"
                              ? "Pay Now"
                              : "Paid"}
                          </Button>
                        </>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))} */}
        {/* {hotel?.servicesUsed &&
            hotel?.servicesUsed?.map((service: any) => (
              <Accordion
                type="single"
                collapsible
                className={`w-full ${cn({
                  "opacity-50": service.status === "Cancelled",
                })}`}
                key={service.serviceId}
                disabled={service.status === "Cancelled"}
              >
                <AccordionItem
                  key={service.serviceId}
                  value={service.serviceId}
                >
                  <AccordionTrigger className="hover:no-underline flex items-center justify-between">
                    <Utensils
                      className={`w-4 h-4 mr-1 text-${service.icon}-500`}
                    />
                    <span className="mr-3">{service.serviceName}</span>
                    <Badge
                      variant={getBadgeVariant(service.status)}
                      className="ml-2"
                    >
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-500 ml-auto">
                      {new Date(service.timeOfRequest).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="font-medium">{service.serviceId}</div>
                      <div className="p-2 space-y-3">
                        <div className="">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col mr-2">
                              <span className="font-medium text-lg">
                                {service.serviceName}
                              </span>
                              {service.description && (
                                <div className="flex items-center text-muted-foreground">
                                  <span className="font-normal mr-2">-</span>
                                  <span className="font-normal">
                                    {service.description}
                                  </span>
                                </div>
                              )}
                              {service.time && (
                                <div className="flex items-center text-muted-foreground">
                                  <span className="font-normal mr-2">-</span>
                                  <span className="font-normal">
                                    {service.time}
                                  </span>
                                </div>
                              )}
                            </div>
                            <span className="text-green-600 font-medium">
                              ₹{Number(service.payment.price)}
                            </span>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">Subtotal</span>
                          </div>
                          <span className="text-green-600 font-semibold">
                            ₹{service.payment.subtotal}
                          </span>
                        </div>
                        {service.payment.gst.gstPercentage && (
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{`Tax (${service.payment.gst.gstPercentage}%)`}</span>
                            </div>
                            <span className="text-green-600 font-semibold">
                              ₹{service.payment.gst.gstAmount}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">Total</span>
                            {service.payment.paymentStatus === "paid" ? (
                              <>
                                <Badge variant="outline" className="mx-2">
                                  Paid
                                </Badge>
                                <Badge variant="outline" className="mx-2">
                                  {service.payment.mode}
                                </Badge>
                              </>
                            ) : (
                              <Badge variant="outline" className="mx-2">
                                Pending
                              </Badge>
                            )}
                          </div>
                          <span className="text-green-600 font-semibold">
                            ₹{service.payment.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancellation(service)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          disabled={service.payment.paymentStatus === "paid"}
                          onClick={() => handlePayment(hotel, service)}
                        >
                          {service.payment.paymentStatus === "pending"
                            ? "Pay Now"
                            : "Paid"}
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))} */}
        {/* {hotel?.issuesReported &&
            Object.values(hotel?.issuesReported).map(
              (service: any, id: any) => (
                <Accordion
                  type="single"
                  collapsible
                  className={`w-full ${cn({
                    "opacity-50": service.status === "Cancelled",
                  })}`}
                  key={id}
                >
                  <AccordionItem key={service.issueId} value={service.issueId}>
                    <AccordionTrigger className="hover:no-underline flex items-center justify-between">
                      <Utensils
                        className={`w-4 h-4 mr-1 text-${service.icon}-500`}
                      />
                      <span className="mr-3">{service.name}</span>
                      <Badge
                        variant={getBadgeVariant(service.status)}
                        className="ml-2"
                      >
                        {service.status.charAt(0).toUpperCase() +
                          service.status.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-500 ml-auto">
                        {new Date(service.reportTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="font-medium">{service.issueId}</div>
                        <p className="text-gray-600">{service.description}</p>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancellation(service)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            )} */}
        {/* </CardContent> */}
      </Card>
    </>
  );
};

export default Dashboard;
