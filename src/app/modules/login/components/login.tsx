"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { addUser } from "@/lib/features/addToOrderSlice";
import { authenticateToken } from "../utils/login";

function LoginComponent() {
  const secretKey = "Vikas@1234";
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams(); // Must be inside Suspense

  useEffect(() => {
    async function decodeUrl() {
      let token = searchParams.get("token");
      if (!token) {
        token = localStorage.getItem("authToken");
      }
      console.log("token", token);
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const decoded = await authenticateToken(token, secretKey);
        console.log("decoded", decoded);

        if (decoded?.payload) {
          // Store the token in localStorage for better user experience
          localStorage.setItem("authToken", token);
          localStorage.setItem("user", JSON.stringify(decoded.payload));

          // Also store in Redux for app state management
          dispatch(addUser({ ...decoded?.payload, token }));
          router.push("/");
        }
      } catch (error) {
        console.error("Invalid or expired token:", error);
        setIsLoading(false);
      }
    }

    decodeUrl();
  }, [router, searchParams, dispatch]);

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
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl font-bold text-red-500">Unauthorized Access</h1>
    </div>
  );
}

// Wrap `LoginComponent` inside Suspense
export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Image
            src="/loader.svg"
            alt="Loading..."
            width={50}
            height={50}
            priority
          />
        </div>
      }
    >
      <LoginComponent />
    </Suspense>
  );
}
