"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtVerify } from "jose";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { addUser } from "@/lib/features/addToOrderSlice";

export default function Login() {
  const secretKey = "Vikas@1234";
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function decodeUrl() {
      const token = searchParams.get("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const key = new TextEncoder().encode(secretKey);
        const decoded = await jwtVerify(token, key, {
          algorithms: ["HS256"],
        });

        if (decoded?.payload) {
          // Store the token in localStorage for later use
          dispatch(addUser({ ...decoded?.payload, token: token }));
          router.push("/");
        }
      } catch (error) {
        console.error("Invalid or expired token:", error);
        setIsLoading(false);
      }
    }

    decodeUrl();
  }, [router, searchParams]);

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
// http://localhost:3001/login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa3VtYXIuYXphZEBnbWFpbC5jb20iLCJyb29tTm8iOiIyMDEiLCJ0YWciOiJjb25jaWVyZ2UiLCJ0YXgiOnsiZ3N0UGVyY2VudGFnZSI6IjE4In19.XzFp_7HHhVxaqzSyrcpY1nptWtezOe3I07SeQrjwyrs
