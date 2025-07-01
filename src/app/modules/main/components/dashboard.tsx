"use client";
import React, { useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { generateToken } from "../utils/mainAPI";
import { useDispatch } from "react-redux";
import { addData, addDiningLink } from "@/lib/features/bookingInfoSlice";
import { AppDispatch } from "@/lib/store";
import RecentOrders from "./recentOrders";

const Dashboard = ({ hotel, info }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  console.log("Dashboard", info);
  const router = useRouter();
  useEffect(() => {
    dispatch(addData(hotel));

    generateToken(
      "vikumar.azad@gmail.com",
      hotel?.bookingDetails?.location,
      hotel?.bookingDetails?.customer?.phone,
      hotel?.bookingDetails?.customer?.name
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
  }, [dispatch, hotel]);

  return (
    <>
      <Card className="w-full max-w-lg shadow-lg mb-10">
        <CardHeader className="space-y-2 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{info?.name}</h2>
              <div className="text-yellow-400">{info?.rating}</div>
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

          <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
            <div>
              <div className="text-sm text-gray-500">CHECK IN</div>
              <div className="font-medium">
                {new Date(hotel?.bookingDetails?.checkIn).toLocaleDateString(
                  "en-GB"
                )}
              </div>
            </div>
            <div className="text-green-700">to</div>
            <div>
              <div className="text-sm text-gray-500">CHECK OUT</div>
              <div className="font-medium">
                {new Date(hotel?.bookingDetails?.checkOut).toLocaleDateString(
                  "en-GB"
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              className="rounded-lg p-2 h-10 w-10 bg-green-100"
              onClick={() => {
                dispatch(addData(hotel));
                router.push("/room");
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
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
      <RecentOrders hotel={hotel} />
    </>
  );
};

export default Dashboard;
