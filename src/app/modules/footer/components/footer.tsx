import React from "react";
import { Button } from "@/components/ui/button";
import { Home, UtensilsCrossed, Settings, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between px-4 py-2">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1"
            onClick={() => router.push("/")}
          >
            <Home className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-medium">Dashboard</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1"
            onClick={() => router.push("/dining")}
          >
            <UtensilsCrossed className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium">Dining</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1"
            onClick={() => router.push("/services")}
          >
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium">Services</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1"
            onClick={() => router.push("/issues")}
          >
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium">Issues</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;