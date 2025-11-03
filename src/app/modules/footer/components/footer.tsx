import React from "react";
import { Home, AlertCircle, ConciergeBell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Image from "next/image";

const Footer = () => {
  const url = usePathname();
  const router = useRouter();
  const diningLink = useSelector(
    (state: RootState) => state.addBooking.diningLink
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white rounded-t-xl ">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between px-4 py-1">
          <div
            className={`py-1.5 px-4 rounded-lg flex flex-col items-center  ${url === "/" ? "bg-green-100 [box-shadow:var(--shadow-s)]" : "bg-transparent"} `}
            onClick={() => router.push("/")}
          >
            <Home className="w-4 h-4 text-black " strokeWidth={2} />
            <span className="text-[10px] font-medium">Dashboard</span>
          </div>

          <Link href={diningLink} target="_blank" passHref>
            <div
              className={`py-1.5 px-4 rounded-lg flex flex-col items-center  ${url === "/dining" ? "bg-green-100 [box-shadow:var(--shadow-s)]" : "bg-transparent"}`}
              data-onboarding="dining-button"
            >
              <Image
                src="/hamburger.svg"
                alt="hamburger"
                width={16}
                height={16}
              />
              {/* <Hamburger className="w-6 h-6 text-black" strokeWidth={2} /> */}
              <span className="text-[10px] font-medium">Food</span>
            </div>
          </Link>

          <div
            className={`py-1.5 px-4 rounded-lg flex flex-col items-center  ${url === "/services" ? "bg-green-100 [box-shadow:var(--shadow-s)]" : "bg-transparent"}`}
            data-onboarding="services-button"
            onClick={() => router.push("/services")}
          >
            <ConciergeBell className={`w-4 h-4 text-black`} />
            <span className="text-[10px] font-medium">Services</span>
          </div>

          <div
            className={`py-1.5 px-4 rounded-lg flex flex-col items-center  ${url === "/issues" ? "bg-green-100 [box-shadow:var(--shadow-s)]" : "bg-transparent"}`}
            data-onboarding="issues-button"
            onClick={() => router.push("/issues")}
          >
            <AlertCircle className={`w-4 h-4 text-black`} />
            <span className="text-[10px] font-medium">Issues</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
