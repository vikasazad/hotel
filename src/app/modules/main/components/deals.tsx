"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Percent, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { sendWhatsAppFlow } from "../utils/mainAPI";

export default function Deals() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Ensure animations are only enabled on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const particlePositions = [
    { top: "10%", left: "20%" },
    { top: "50%", left: "60%" },
    { top: "80%", left: "40%" },
  ];

  const handleClick = async () => {
    router.push("/coupon");
    await sendWhatsAppFlow("+918851280284", "Vikas", "301");
  };

  return (
    <Card className="w-full  overflow-hidden bg-gradient-to-br from-violet-100 to-violet-200 border-none mb-4 ">
      <CardContent className="p-3 relative">
        {/* Animated background particles */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden">
            {particlePositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ ...pos, scale: 0 }}
                animate={{ ...pos, scale: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut",
                }}
              >
                <Gift className="w-6 h-6 text-violet-300 opacity-50" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="relative space-y-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-violet-950">
              Deals of the day!
            </h2>
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-pink-500" />
              <p className="text-base text-violet-900">Get 20% off on Spa</p>
            </div>
          </div>

          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white group relative overflow-hidden"
            size="lg"
            onClick={() => handleClick()}
          >
            <span className="relative flex items-center gap-2">
              CLICK HERE
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </span>
            <motion.div
              className="absolute inset-0 bg-pink-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </Button>
        </div>

        {/* Decorative elements */}
        {isClient && (
          <motion.div
            className="absolute -right-4 top-4 text-pink-500"
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              <Percent className="w-12 h-12" />
              <div className="absolute inset-0 blur-sm opacity-50">
                <Percent className="w-12 h-12" />
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
