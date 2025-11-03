"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store, { AppStore } from "../lib/store";
import { ClerkProvider } from "@clerk/nextjs";

import { DM_Sans } from "next/font/google";
import { useRef, useEffect } from "react";
import Footer from "./modules/footer/components/footer";
import { usePathname } from "next/navigation";
import FeedbackProvider from "@/components/providers/FeedbackProvider";

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
  let showFooter = false;
  showFooter = !hideFooterRoutes.includes(pathname);
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }

  // Add viewport meta tag to prevent iOS zoom on input focus
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content =
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <ClerkProvider>
      <html lang="en" className={dmSans.className}>
        <body>
          <main className="[background:var(--bg-light)]">
            <Provider store={storeRef.current}>
              {children}
              {showFooter && <Footer />}
              <FeedbackProvider />
            </Provider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
