"use client";
import { useEffect, useState } from "react";
import Deals from "./deals";
import Dashboard from "./dashboard";
// import Header from "../../header/components/header";
import { getHotelDataLive } from "@/lib/firebase/functions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import QuickServices from "./quickServices";
// import { getAuthData } from "@/lib/redis/redisData";
import { authenticateToken } from "../../login/utils/login";
import RecentOrders from "./recentOrders";
import Onboarding from "@/components/ui/onboarding";

// Import test utilities for development/testing

// import QuickServices from "./quickServices";

const Main = () => {
  const user = useSelector((state: RootState) => state.addToOrderData.user);
  const [data, setData] = useState({
    hotel: false,
    info: { infoData: false, tax: false },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const router = useRouter();
  const secretKey = "Vikas@1234";

  // Onboarding steps configuration
  const onboardingSteps = [
    {
      id: "offers",
      targetSelector: '[data-onboarding="offers-card"]',
      title: "Deals of the day!",
      description: "Tap to view exclusive offers and discounts.",
    },
    {
      id: "details-card",
      targetSelector: '[data-onboarding="details-card"]',
      title: "Your Booking",
      description: "View your stay details and check-in/out dates.",
    },
    {
      id: "room-info",
      targetSelector: '[data-onboarding="room-info-button"]',
      title: "Room Details",
      description: "Tap the arrow to see your room information.",
    },
    {
      id: "checkout",
      targetSelector: '[data-onboarding="checkout-button"]',
      title: "Quick Checkout",
      description: "Checkout easily and get 10% off with feedback.",
    },
    {
      id: "quick-services",
      targetSelector: '[data-onboarding="quick-services"]',
      title: "Quick Services",
      description: "Instant requests for water, toiletries, and more.",
    },
    {
      id: "dining",
      targetSelector: '[data-onboarding="dining-button"]',
      title: "Dining",
      description: "Order food directly to your room.",
    },
    {
      id: "services",
      targetSelector: '[data-onboarding="services-button"]',
      title: "Services",
      description: "Access laundry, spa, upgrades, and tours.",
    },
    {
      id: "issues",
      targetSelector: '[data-onboarding="issues-button"]',
      title: "Report Issues",
      description: "Need help? Report any issues here.",
    },
  ];

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboarding_completed", "true");
    setShowOnboarding(false);
  };

  const handleOnboardingSkip = () => {
    localStorage.setItem("onboarding_completed", "true");
    setShowOnboarding(false);
  };

  // Helper function to reset onboarding (for testing)
  const resetOnboarding = () => {
    localStorage.removeItem("onboarding_completed");
    setShowOnboarding(true);
  };

  // Expose reset function to window for console access
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).resetOnboarding = resetOnboarding;
    }
  }, []);

  useEffect(() => {
    // This effect will only run in the browser
    const token: any = user?.token;
    if (!token) {
      router.push("/login");
      return;
    }

    // async function fetchAuthData() {
    //   const data = await getAuthData();
    //   console.log("dataaaaaaaaaaaaaa", data);
    // }

    async function verifyAndSetupListener() {
      try {
        const decoded = await authenticateToken(token, secretKey);
        console.log("decoded", decoded);
        console.log(decoded);

        if (decoded?.payload?.roomNo) {
          // Set up real-time listener
          const unsubscribe = getHotelDataLive(
            decoded?.payload?.roomNo as string,
            decoded?.payload?.email as string,
            (newData) => {
              setData(newData);
              setIsLoading(false);
            }
          );
          return () => unsubscribe();
        } else {
          console.log("No phone number found");
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      }
    }

    // fetchAuthData();
    verifyAndSetupListener();
  }, [router, user]);

  // Check if onboarding should be shown
  useEffect(() => {
    if (!isLoading) {
      const hasCompletedOnboarding = localStorage.getItem(
        "onboarding_completed"
      );
      if (!hasCompletedOnboarding) {
        // Add a small delay to ensure all elements are rendered
        setTimeout(() => {
          setShowOnboarding(true);
        }, 500);
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src="/loader.svg"
          alt="Loading..."
          width={50}
          height={50}
          priority
        />
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* <Header data={data.info} /> */}
      <h1 className="text-3xl font-extrabold px-2 py-2">Dashboard</h1>
      <Deals />
      <Dashboard
        user={user}
        hotel={data.hotel}
        info={data.info?.infoData}
        tax={data.info?.tax}
        email={user?.email}
      />
      <QuickServices user={user} requests={data.hotel} />
      <RecentOrders hotel={data.hotel} />

      {/* Onboarding Flow */}
      {showOnboarding && (
        <Onboarding
          steps={onboardingSteps}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </div>
  );
};

export default Main;
