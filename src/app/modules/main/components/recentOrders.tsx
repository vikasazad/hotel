import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StatusChip from "@/lib/StatusChip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  // AlertCircle,
  BadgeAlert,
  // CheckCircle,
  ChevronDown,
  HandPlatter,
  IndianRupee,
  Package,
  Phone,
  // Timer,
  TreePalm,
  Utensils,
} from "lucide-react";
import Script from "next/script";
import React, { useState } from "react";
import { cancelOrder, createOrder } from "../utils/mainAPI";
const RecentOrders = ({ hotel }: any) => {
  console.log("hotel", hotel);
  const [openOrders, setOpenOrders] = useState<string[]>([]);
  const [openServices, setOpenServices] = useState<string[]>([]);
  const [openIssues, setOpenIssues] = useState<string[]>([]);
  const [loadScript, setLoadScript] = useState(false);
  const toggleIssue = (issueId: string) => {
    setOpenIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };
  const toggleService = (serviceId: string) => {
    setOpenServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  const toggleOrder = (orderId: string) => {
    setOpenOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case "Preparing":
  //       return <Timer className="w-4 h-4 mr-2" />;
  //     case "Ready for Delivery":
  //       return <AlertCircle className="w-4 h-4 mr-2" />;
  //     case "Delivered":
  //       return <CheckCircle className="w-4 h-4 mr-2" />;
  //     default:
  //       return <Clock className="w-4 h-4 mr-2" />;
  //   }
  // };
  const handlePayment = (hotel: any, service: any, id: string) => {
    console.log("clicked");
    console.log("INFO", hotel, service, id);

    setLoadScript(true);
    createOrder({
      location: hotel.bookingDetails?.location,
      customer: hotel.bookingDetails?.customer,
      orderData: service,
      id: id,
    });
  };

  const handleCancellation = (service: any) => {
    console.log(service);
    let id = service.serviceId;
    if (service.issueId) {
      id = service.issueId;
    }
    cancelOrder(id, hotel.bookingDetails?.location);
  };
  return (
    <>
      {loadScript && (
        <Script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
      )}
      <div className="w-full max-w-xl mx-auto  mb-12 space-y-3">
        {hotel?.diningDetails?.orders?.length > 0 ||
        hotel?.servicesUsed?.length > 0 ||
        Object.keys(hotel?.issuesReported || {}).length > 0 ? (
          <>
            {hotel?.diningDetails?.orders?.length > 0 && (
              <h2 className="text-xl font-bold mb-4">Orders</h2>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 mx-2">Orders</h2>
            <p className="text-center text-gray-600 text-sm mx-auto">
              No orders found...
            </p>
          </>
        )}
        {hotel?.diningDetails?.orders?.length > 0 &&
          hotel?.diningDetails?.orders.map((service: any) => {
            const isOpen = openOrders.includes(service.orderId);
            return (
              <Card
                key={service.orderId}
                className="bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden"
              >
                <Collapsible
                  open={isOpen}
                  onOpenChange={() => toggleOrder(service.orderId)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-2 hover:from-amber-100 hover:via-orange-100 hover:to-amber-100 transition-all duration-300 border-b border-amber-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                              <Utensils className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {service.items.length}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="font-bold text-lg text-gray-900">
                                {service.orderId}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              <StatusChip status={service.status} />

                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="font-medium text-sm">
                                  {new Date(
                                    service.timeOfRequest
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right space-y-1">
                            <div className="flex items-center ">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                              <span className="text-xl font-bold text-gray-900">
                                {service.payment.price}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                              Total
                            </div>
                          </div>
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <ChevronDown
                              className={`w-6 h-6 text-gray-600 transition-transform duration-500 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="p-4 bg-white">
                      <div className="flex  items-center  mb-4 ">
                        <div className="px-2 py-1 bg-gradient-to-br from-blue-50 to-indigo-50  rounded-2xl border border-blue-200">
                          <div className="flex items-center">
                            <span className="text-md font-semibold text-blue-700 uppercase tracking-wide mr-2">
                              ETA:
                            </span>
                            <div className="font-bold text-blue-900">
                              {/* {service.estimatedTime} */}25-30 mins
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                          <HandPlatter className="w-6 h-6 text-orange-500" />
                          <span>Gourmet Selection</span>
                        </h4>
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-2 border border-gray-200">
                          {service.items.map((item: any) => (
                            <div
                              key={item.name}
                              className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0 space-x-2"
                            >
                              <div className="flex items-center space-x-2">
                                <div>
                                  <div className="font-bold text-lg text-gray-900">
                                    {item.name}
                                  </div>
                                  <div className="text-sm text-gray-600 font-medium">
                                    Quantity: {item.quantity}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center ">
                                <IndianRupee className="w-4 h-4 text-green-600" />
                                <span className="text-xl font-bold text-green-600">
                                  {item.price}
                                </span>
                              </div>
                            </div>
                          ))}
                          <Separator className="mb-2" />
                          <div className="space-y-2">
                            {service.payment.discount.length > 0 &&
                              service.payment.discount[0].discountAmount > 0 &&
                              service.payment.discount.map((discount: any) => (
                                <div
                                  className="flex justify-between items-center"
                                  key={discount.code}
                                >
                                  <div>
                                    <span className="font-medium">
                                      Discount{" "}
                                      <Badge variant="outline" className="mx-2">
                                        {discount.code}
                                      </Badge>
                                    </span>
                                  </div>
                                  <span className="text-green-600 font-semibold flex items-center ">
                                    <IndianRupee className="w-4 h-4" />
                                    {service.payment.subtotal}
                                  </span>
                                </div>
                              ))}
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">Subtotal</span>
                              </div>
                              <span className="text-green-600 font-semibold flex items-center ">
                                <IndianRupee className="w-4 h-4" />
                                {service.payment.subtotal}
                              </span>
                            </div>
                            {service.payment.gst.gstPercentage && (
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium">{`Tax (${service.payment.gst.gstPercentage}%)`}</span>
                                </div>
                                <span className="text-green-600 font-semibold flex items-center ">
                                  <IndianRupee className="w-4 h-4" />
                                  {service.payment.gst.gstAmount}
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
                              <span className="text-green-600 font-semibold flex items-center ">
                                <IndianRupee className="w-4 h-4" />
                                {service.payment.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-200 gap-2">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-[50%] rounded-2xl border-2 hover:bg-gray-50 bg-transparent"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Call Kitchen
                        </Button>
                        {service.status !== "Delivered" && (
                          <Button
                            size="lg"
                            className="w-[50%] rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-xl"
                            disabled={service.payment.paymentStatus === "paid"}
                            onClick={() =>
                              handlePayment(hotel, service, service.orderId)
                            }
                          >
                            {service.payment.paymentStatus === "pending"
                              ? "Pay"
                              : "Paid"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        {/* services */}
        {hotel?.servicesUsed?.length > 0 && (
          <h2 className="text-xl font-bold  mb-4">Services</h2>
        )}
        {hotel?.servicesUsed?.length > 0 &&
          hotel?.servicesUsed.map((service: any) => {
            const isOpen = openServices.includes(service.serviceId);
            return (
              <Card
                key={service.serviceId}
                className="bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden"
              >
                <Collapsible
                  open={isOpen}
                  onOpenChange={() => toggleService(service.serviceId)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-2 hover:from-amber-100 hover:via-orange-100 hover:to-amber-100 transition-all duration-300 border-b border-amber-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                              <TreePalm className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {/* {service.items.length} */}1
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="font-bold text-lg text-gray-900">
                                {service.serviceId}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              <StatusChip status={service.status} />

                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="font-medium text-sm">
                                  {new Date(
                                    service.timeOfRequest
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right space-y-1">
                            <div className="flex items-center ">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                              <span className="text-xl font-bold text-gray-900">
                                {service.payment.price}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                              Total
                            </div>
                          </div>
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <ChevronDown
                              className={`w-6 h-6 text-gray-600 transition-transform duration-500 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="p-4 bg-white">
                      <div className="flex  items-center  mb-4 ">
                        <div className="px-2 py-1 bg-gradient-to-br from-blue-50 to-indigo-50  rounded-2xl border border-blue-200">
                          <div className="flex items-center">
                            <span className="text-md font-semibold text-blue-700 uppercase tracking-wide mr-2">
                              Date:
                            </span>
                            <div className="font-bold text-blue-900">
                              {/* {service.estimatedTime} */}25.07.2025
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-md font-semibold text-blue-700 uppercase tracking-wide mr-2">
                              Slot:
                            </span>
                            <div className="font-bold text-blue-900">
                              {/* {service.estimatedTime} time field has to be used for the time slot  */}
                              10:00AM - 11:00 AM
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                          <Package className="w-6 h-6 text-orange-500" />
                          <span>Service</span>
                        </h4>
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-2 border border-gray-200">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0 space-x-2">
                            <div className="flex items-center space-x-2">
                              <div>
                                <div className="font-bold text-lg text-gray-900">
                                  {service.serviceName}
                                </div>
                                {service.description && (
                                  <div className="text-sm text-gray-600 font-medium">
                                    {service.description}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center ">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                              <span className="text-xl font-bold text-gray-900">
                                {Number(service.payment.price)}
                              </span>
                            </div>
                          </div>

                          <Separator className="mb-2" />
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">Subtotal</span>
                              </div>
                              <span className="text-green-600 font-semibold flex items-center ">
                                <IndianRupee className="w-4 h-4" />
                                {service.payment.subtotal}
                              </span>
                            </div>
                            {service.payment.gst.gstPercentage && (
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium">{`Tax (${service.payment.gst.gstPercentage}%)`}</span>
                                </div>
                                <span className="text-green-600 font-semibold flex items-center ">
                                  <IndianRupee className="w-4 h-4" />
                                  {service.payment.gst.gstAmount}
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
                              <span className="text-green-600 font-semibold flex items-center ">
                                <IndianRupee className="w-4 h-4" />
                                {service.payment.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between gap-2 mt-4 pt-4 border-t-2 border-gray-200">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-[50%] rounded-2xl border-2 hover:bg-gray-50 bg-transparent"
                          onClick={() => handleCancellation(service)}
                        >
                          Cancel
                        </Button>
                        {service.status !== "Delivered" && (
                          <Button
                            size="lg"
                            className="w-[50%] rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-xl"
                            disabled={service.payment.paymentStatus === "paid"}
                            onClick={() =>
                              handlePayment(hotel, service, service.serviceId)
                            }
                          >
                            {service.payment.paymentStatus === "pending"
                              ? "Pay"
                              : "Paid"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        {Object.keys(hotel?.issuesReported || {}).length > 0 && (
          <h2 className="text-xl font-bold  mb-4">Issues</h2>
        )}
        {hotel?.issuesReported &&
          Object.values(hotel?.issuesReported || {}).map((service: any) => {
            const isOpen = openIssues.includes(service.issueId);
            return (
              <Card
                key={service.issueId}
                className="bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden"
              >
                <Collapsible
                  open={isOpen}
                  onOpenChange={() => toggleIssue(service.issueId)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-2 hover:from-amber-100 hover:via-orange-100 hover:to-amber-100 transition-all duration-300 border-b border-amber-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                              <BadgeAlert className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {/* {service.items.length} */}1
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="font-bold text-lg text-gray-900">
                                {service.issueId}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              <StatusChip status={service.status} />

                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="font-medium text-sm">
                                  {new Date(
                                    service.reportTime
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <ChevronDown
                              className={`w-6 h-6 text-gray-600 transition-transform duration-500 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="p-4 bg-white">
                      <div className="flex  items-center  mb-4 ">
                        <div className="px-2 py-1 bg-gradient-to-br from-blue-50 to-indigo-50  rounded-2xl border border-blue-200">
                          <div className="flex items-center">
                            <span className="text-md font-semibold text-blue-700 uppercase tracking-wide mr-2">
                              Attended By:
                            </span>
                            <div className="font-bold text-blue-900">
                              {service.attendant}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                          <Package className="w-6 h-6 text-orange-500" />
                          <span>Issue</span>
                        </h4>
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-2 border border-gray-200">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0 space-x-2">
                            <div className="flex items-center space-x-2">
                              <div>
                                <div className="font-bold text-lg text-gray-900">
                                  {service.category} - {service.name}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                  {service.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between gap-2 mt-4 pt-4 border-t-2 border-gray-200">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-[50%] rounded-2xl border-2 hover:bg-gray-50 bg-transparent"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="lg"
                          className="w-[50%] rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-xl"
                        >
                          Mark as Resolved
                        </Button>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default RecentOrders;
