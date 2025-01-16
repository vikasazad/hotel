"use client";
import { Button } from "@/components/ui/button";
import { add } from "@/lib/firebase/firestore";
import React from "react";

const page = () => {
  const data = [
    {
      bookingDetails: {
        customer: {
          name: "vipin",
          email: "tanejavipin@gmail.com",
          phone: "+918897562548",
          address: "26 lokhand wala circle, parel mumbai",
        },
        location: "101",
        roomType: "deluxe",
        aggregator: "makeMyTrip",
        aggregatorLogo:
          "https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg",
        bookingId: "RO:8966",
        status: "occupied",
        attendant: "Shyam Mishra",
        bookingDate: "2024-09-29T10:00:00.000Z",
        checkIn: "2024-09-30T07:00:00.000Z",
        checkOut: "2024-10-02T07:00:00.000Z",
        noOfGuests: "2",
        noOfRoom: "1",
        inclusions: ["wifi", "breakfast"],
        specialRequirements: "Late check-out requested",
        payment: {
          transctionId: "XUSie83",
          paymentStatus: "pending",
          mode: "room charge",
          paymentId: "RO24092101",
          price: "27",
          priceAfterDiscount: "27",
          timeOfTransaction: "2024-10-02T07:00:00.000Z",
          gst: {
            gstAmount: "100",
            gstPercentage: "18%",
            cgstAmount: "50",
            cgstPercentage: "9%",
            sgstAmount: "50",
            sgstPercentage: "9%",
          },
          discount: {
            type: "none",
            amount: 0,
            code: "",
          },
        },
      },
      diningDetails: {
        orders: [
          {
            orderId: "OR:123",
            specialRequirement: "Make pina collada extra sour",
            items: [
              {
                itemId: "gac1",
                itemName: "Pizza",
                portionSize: "Large",
                price: "20",
              },
              {
                itemId: "mac1",
                itemName: "Salad",
                portionSize: "Small",
                price: "10",
              },
            ],
            attendant: "Alice Smith",
            status: "open",
            timeOfRequest: "2024-10-03T10:10:00.000Z",
            timeOfFullfilment: "2024-10-03T10:25:00.000Z",
            payment: {
              transctionId: "XUSie83",
              paymentStatus: "pending",
              mode: "room charge",
              paymentId: "RO24092101",
              price: "27",
              priceAfterDiscount: "27",
              timeOfTransaction: "2024-10-02T07:00:00.000Z",
              gst: {
                gstAmount: "100",
                gstPercentage: "18%",
                cgstAmount: "50",
                cgstPercentage: "9%",
                sgstAmount: "50",
                sgstPercentage: "9%",
              },
              discount: {
                type: "none",
                amount: 0,
                code: "",
              },
            },
          },
        ],
        location: "T13",
        attendant: "Sarah Johnson",
        timeSeated: "2024-09-21T15:47:00.000Z",
        timeLeft: "2024-09-26T04:47:00.000Z",
        aggregator: "makeMyTrip",
        aggregatorLogo:
          "https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg",
        noOfGuests: "2",
        capicity: "4",
        status: "occupied",
        payment: {
          transctionId: "XUSie83",
          paymentStatus: "pending",
          mode: "room charge",
          paymentId: "RO24092101",
          price: "27",
          priceAfterDiscount: "27",
          timeOfTransaction: "2024-10-02T07:00:00.000Z",
          gst: {
            gstAmount: "100",
            gstPercentage: "18%",
            cgstAmount: "50",
            cgstPercentage: "9%",
            sgstAmount: "50",
            sgstPercentage: "9%",
          },
          discount: {
            type: "none",
            amount: 0,
            code: "",
          },
        },
      },
      servicesUsed: [
        {
          serviceId: "SE:123",
          serviceName: "Massage",
          type: "massage",
          requestTime: "2024-09-25T08:47:00.000Z",
          startTime: "2024-09-25T11:47:00.000Z",
          endTime: "2024-09-25T12:47:00.000Z",
          price: 50,
          attendant: "Bob Johnson",
          status: "competed",
          payment: {
            transctionId: "XUSie83",
            paymentStatus: "on checkout",
            mode: "room charge",
            paymentId: "SPA24092101",
            timeOfTransaction: "2024-10-02T07:00:00.000Z",
            price: "80",
            priceAfterDiscount: "72",
            gst: {
              gstAmount: "100",
              gstPercentage: "18%",
              cgstAmount: "50",
              cgstPercentage: "9%",
              sgstAmount: "50",
              sgstPercentage: "9%",
            },
            discount: {
              type: "percentage",
              amount: 10,
              code: "SPAWEEKEND",
            },
          },
        },
      ],
      issuesReported: {
        maintenance: {
          issueId: "IS:123",
          category: "maintenance",
          name: "Leaking faucet",
          description: "Faucet in the bathroom is leaking.",
          reportTime: "2024-09-21T18:00:00Z",
          status: "Assigned",
          attendant: "Charlie Brown",
          resolutionTime: null,
        },
      },
      transctions: [
        {
          location: "104",
          against: "SE:7889",
          attendant: "Mishra",
          bookingId: "BO:123",
          payment: {
            paymentStatus: "complete",
            mode: "online",
            paymentId: "TXN123456",
            timeOfTransaction: "2024-09-29T10:00:00.000Z",
            price: "30",
            priceAfterDiscount: "27",
            gst: {
              gstAmount: "100",
              gstPercentage: "18%",
              cgstAmount: "50",
              cgstPercentage: "9%",
              sgstAmount: "50",
              sgstPercentage: "9%",
            },
            discount: {
              type: "coupon",
              amount: 3,
              code: "SAVE10",
            },
          },
        },
      ],
    },
  ];
  async function handleClick() {
    const call = await add("vikumar.azad@gmail.com", data, "hotel");
    console.log(call);
  }
  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
};

export default page;
