"use client";
import { useEffect, useState } from "react";
import Deals from "./deals";
import Dashboard from "./dashboard";
import Header from "../../header/components/header";
import { getHotelDataLive } from "@/lib/firebase/functions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import QuickServices from "./quickServices";
import { getAuthData } from "@/lib/redis/redisData";
import { authenticateToken } from "../../login/utils/login";

// Import test utilities for development/testing

// import QuickServices from "./quickServices";

const Main = () => {
  const user = useSelector((state: RootState) => state.addToOrderData.user);
  const [data, setData] = useState({ hotel: false, info: false });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const secretKey = "Vikas@1234";

  useEffect(() => {
    // This effect will only run in the browser
    const token: any = user?.token;
    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchAuthData() {
      const data = await getAuthData();
      console.log("dataaaaaaaaaaaaaa", data);
    }

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

    fetchAuthData();
    verifyAndSetupListener();
  }, [router, user]);

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
      <Header data={data.info} />
      <h1 className="text-2xl font-extrabold px-2 py-2">Dashboard</h1>
      <Deals />
      <QuickServices user={user} requests={data.hotel} />
      <Dashboard hotel={data.hotel} info={data.info} email={user?.email} />
    </div>
  );
};

export default Main;
