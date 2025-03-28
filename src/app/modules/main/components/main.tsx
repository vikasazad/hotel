"use client";
import { useEffect, useState } from "react";
import Deals from "./deals";
import Dashboard from "./dashboard";
import Header from "../../header/components/header";
import { getHotelDataLive } from "@/lib/firebase/functions";
import { jwtVerify } from "jose";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import QuickServices from "./quickServices";

const Main = () => {
  const [data, setData] = useState({ hotel: false, info: false });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const secretKey = "Vikas@1234";

  useEffect(() => {
    async function verifyAndSetupListener() {
      try {
        // Check if we're in browser environment
        const token =
          typeof window !== "undefined"
            ? localStorage?.getItem("authToken")
            : null;

        if (!token) {
          router.push("/login");
          return;
        }

        const key = new TextEncoder().encode(secretKey);
        const decoded: any = await jwtVerify(token, key, {
          algorithms: ["HS256"],
        });
        console.log(decoded);

        if (decoded?.payload?.phone) {
          // Set up real-time listener
          const unsubscribe = getHotelDataLive(
            decoded?.payload?.phone as string,
            decoded?.payload?.email,
            (newData) => {
              setData(newData);
              setIsLoading(false);
            }
          );
          return () => unsubscribe();
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      }
    }

    verifyAndSetupListener();
  }, [router]);

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
      <Dashboard hotel={data.hotel} info={data.info} />
      {/* <QuickServices /> */}
    </div>
  );
};

export default Main;
