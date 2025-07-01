"use client";

import React, { useEffect, useState } from "react";
import Services from "../modules/services/components/services";
import { getServices } from "../modules/services/utils/servicesApi";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Image from "next/image";

const Page = () => {
  const [services, setServices] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const _service = await getServices();
        setServices(_service);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-screen">
          <Image
            src="/loader.svg"
            alt="Loading services..."
            width={50}
            height={50}
            priority
          />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div>
        <Services data={services} />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
