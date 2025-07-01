"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store, { AppStore } from "../lib/store";
import { ClerkProvider } from "@clerk/nextjs";

import { DM_Sans } from "next/font/google";
import { useRef } from "react";
import Footer from "./modules/footer/components/footer";
import { usePathname } from "next/navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideFooterRoutes = ["/login"];
  const showFooter = !hideFooterRoutes.includes(pathname);
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return (
    <ClerkProvider>
      <html lang="en" className={dmSans.className}>
        <body>
          <main>
            <Provider store={storeRef.current}>
              {children}
              {showFooter && <Footer />}
            </Provider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
