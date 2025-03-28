"use client";
import "./globals.css";
import { Provider, useSelector } from "react-redux";
import store, { AppStore, RootState } from "../lib/store";

import { DM_Sans } from "next/font/google";
import { useRef } from "react";
import Footer from "./modules/footer/components/footer";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }
  const user = useSelector((state: RootState) => state.addToOrderData.user);
  return (
    <html lang="en" className={dmSans.className}>
      <body>
        <main>
          <Provider store={storeRef.current}>
            {children}
            {user?.token && <Footer />}
          </Provider>
        </main>
      </body>
    </html>
  );
}
