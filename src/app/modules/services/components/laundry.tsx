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
import { ArrowLeft } from "lucide-react";

const Laundry = ({ data, flag }: any) => {
  console.log("DATA", data);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      serviceType: "",
      description: "",
    },
  });

  const onSubmit = (el: any) => {
    const serviceDetails = selectedService ? data[selectedService][0] : null;
    console.log("Booking submitted:", {
      selectedService,
      serviceDetails,
      userDescription: el.description,
    });
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
                  <p className="font-bold">
                    Price: ₹{data[selectedService][0].price}
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
