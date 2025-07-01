"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import Image from "next/image";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, requireAuth } = useAuth();

  useEffect(() => {
    // Only redirect if we're not loading and definitely not authenticated
    if (!isLoading && !isAuthenticated) {
      requireAuth();
    }
  }, [isLoading, isAuthenticated, requireAuth]);

  // Show loading spinner while checking authentication
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

  // Show loading spinner while redirecting to login
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src="/loader.svg"
          alt="Redirecting to login..."
          width={50}
          height={50}
          priority
        />
      </div>
    );
  }

  // User is authenticated, show the protected content
  return <>{children}</>;
}
