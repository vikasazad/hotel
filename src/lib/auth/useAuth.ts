import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { authenticateToken } from "@/app/modules/login/utils/login";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  token: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
  });

  const router = useRouter();
  const { user: clerkUser } = useUser();
  const secretKey = "Vikas@1234";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication from localStorage...");
        // Check localStorage for token immediately on mount
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
          console.log("No token or user data found in localStorage");
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            token: null,
          });
          return;
        }

        console.log("Token found in localStorage, verifying...");
        // Verify the JWT token
        const decoded = await authenticateToken(token, secretKey);

        if (decoded?.payload) {
          console.log("Token verified successfully");
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: JSON.parse(userData),
            token: token,
          });
        } else {
          console.log("❌ Token verification failed");
          // Invalid token, clear localStorage
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            token: null,
          });
        }
      } catch (error) {
        console.error("❌ Token verification error:", error);
        // Clear invalid token
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          token: null,
        });
      }
    };

    // Check auth immediately on mount, don't wait for Clerk
    checkAuth();
  }, []); // Remove isLoaded dependency

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
    });
    router.push("/login");
  };

  const requireAuth = () => {
    // Only redirect if we're not loading and definitely not authenticated
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push("/login");
    }
  };

  return {
    ...authState,
    logout,
    requireAuth,
    clerkUser,
  };
};
