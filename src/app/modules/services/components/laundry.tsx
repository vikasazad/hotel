"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
// import { assignAttendantSequentially } from "../utils/servicesApi";

const Laundry = ({ data, flag }: any) => {
  console.log("DATA", data);
  const user = useSelector((state: RootState) => state.addToOrderData.user);
  console.log("user", user);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      serviceType: "",
      description: "",
    },
  });

  const onSubmit = (el: any) => {
    const serviceDetails = selectedService ? data[selectedService][0] : null;
    // const assignedAttendant: any =
    //   assignAttendantSequentially(availableAttendant);
    // const newOrderId = `SE:R-${
    //   user.roomNo
    // }:${generateRandomOrderNumber()}`;
    console.log("Booking submitted:", {
      selectedService,
      serviceDetails,
      userDescription: el.description,
    });

    // const newService = {
    //   serviceId: newOrderId,
    //   serviceName: items[0].name,
    //   startTime: items[0].startTime,
    //   endTime: items[0].endTime,
    //   price: parseFloat(items[0].price),
    //   attendant: assignedAttendant ? assignedAttendant.name : "Unassigned",
    //   attendantToken: assignedAttendant
    //     ? assignedAttendant.notificationToken
    //     : "",
    //   status: "requested",
    //   description: items[0].description,
    //   timeOfRequest: new Date().toISOString(),
    //   payment: {
    //     discount: {
    //       type: "none",
    //       amount: 0,
    //       code: "",
    //     },
    //     gst: {
    //       ...gst,
    //     },
    //     subtotal: parseFloat(items[0].price),
    //     mode: "",
    //     paymentId: "",
    //     paymentStatus: "pending",
    //     price: parseFloat(items[0].price),
    //     totalPrice: totalPrice,
    //     priceAfterDiscount: "",
    //     timeOfTransaction: "",
    //     transctionId: "",
    //   },
    // };
  };

  return (
    <>
      <Button variant="ghost" className="mt-2" onClick={() => flag(false)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Book Laundry Service</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedService(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(data).map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedService && (
              <>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h2 className="text-xl font-semibold mb-2">
                    {data[selectedService][0].typeName}
                  </h2>
                  <p className="mb-2">{data[selectedService][0].description}</p>
                  <p className="font-bold flex items-center ">
                    Price: <IndianRupee className="w-4 h-4" />
                    {data[selectedService][0].price}
                  </p>
                  <p>
                    Minimum Time: {data[selectedService][0].minTime.hours}{" "}
                    hour(s) {data[selectedService][0].minTime.minutes} minute(s)
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any special instructions or details about your laundry service request"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" disabled={!selectedService}>
              Book Service
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
export default Laundry;
