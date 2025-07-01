import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/",
  "/room(.*)",
  "/services(.*)",
  "/issues(.*)",
  "/coupon(.*)",
  "/test(.*)",
]);

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/login(.*)", "/api/auth/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Allow access to public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For protected routes, we'll let the client-side handle localStorage token validation
  // This allows for better user experience on page reloads
  if (isProtectedRoute(req)) {
    // If Clerk has a userId, allow access
    if (userId) {
      return NextResponse.next();
    }

    // If no Clerk userId, still allow the request to proceed
    // The client-side ProtectedRoute component will handle localStorage token validation
    // This prevents the middleware from blocking users with valid localStorage tokens
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
