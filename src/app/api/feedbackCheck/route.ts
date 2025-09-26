import { getFeedbackSettings } from "@/app/modules/main/utils/mainAPI";
import { redis } from "@/lib/redis/redis";
import { DateTime } from "luxon";

export async function GET() {
  const hotelId = "vikumar.azad@gmail.com";

  // Try cache first
  let settings: { startTime: number; endTime: number } | null =
    await redis.get("feedback");
  let showFeedbackPrompt: boolean = false;
  console.log("settings", settings);

  // Check if we're in production (Vercel deployment)
  const isProduction = process.env.WORK_ENV === "production";

  // Define hotel timezone (you can make this configurable later)
  const hotelTimezone = "Asia/Kolkata"; // IST timezone

  let currentHour: number;
  let currentTime: DateTime;

  if (isProduction) {
    // In production, work with UTC time
    currentTime = DateTime.utc();
    currentHour = currentTime.hour;
  } else {
    // In development, use hotel's local timezone
    currentTime = DateTime.now().setZone(hotelTimezone);
    currentHour = currentTime.hour;
  }

  console.log("Environment:", isProduction ? "Production" : "Development");
  console.log("Current time:", currentTime.toISO());
  console.log(
    "Current hour:",
    currentHour,
    isProduction ? "(UTC)" : `(${hotelTimezone})`
  );

  if (!settings?.startTime || !settings?.endTime) {
    // Fallback: fetch from DB
    settings = await getFeedbackSettings(hotelId);
    console.log("Fetched settings from DB:", settings);

    // Save to cache for 1 hour
    await redis.set("feedback", JSON.stringify(settings), {
      ex: 60,
    });
    if (settings?.startTime !== undefined && settings?.endTime !== undefined) {
      showFeedbackPrompt =
        currentHour >= settings.startTime && currentHour < settings.endTime;
    }
  } else {
    console.log("Using cached settings");
    showFeedbackPrompt =
      currentHour >= settings.startTime && currentHour < settings.endTime;
    console.log("showFeedbackPrompt", showFeedbackPrompt, settings);
  }

  return Response.json({ showFeedbackPrompt });
}
// export async function GET() {
//   const now = new Date();
//   const hour = now.getHours();

//   const showFeedbackPrompt = hour >= 18 && hour < 20; // 7–8 PM
//   return Response.json({ showFeedbackPrompt });
// }
