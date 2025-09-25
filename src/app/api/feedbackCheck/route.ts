import { getFeedbackSettings } from "@/app/modules/main/utils/mainAPI";
import { redis } from "@/lib/redis/redis";

export async function GET() {
  const hotelId = "vikumar.azad@gmail.com";

  // Try cache first
  let settings: { startTime: number; endTime: number } | null =
    await redis.get("feedback");
  let showFeedbackPrompt: boolean = false;
  console.log("settings", settings);

  const now = new Date();
  let hour: number;

  // Check if we're in production (Vercel deployment)
  const isProduction = process.env.WORK_ENV === "production";

  if (isProduction) {
    // In production, get UTC hour for comparison with UTC-converted DB times
    hour = now.getUTCHours();
  } else {
    // In development, use local timezone
    hour = now.getHours();
  }
  console.log("Environment:", isProduction ? "Production" : "Development");
  console.log("Current hour:", hour, isProduction ? "(UTC)" : "(Local)");

  if (!settings?.startTime || !settings?.endTime) {
    // Fallback: fetch from DB
    settings = await getFeedbackSettings(hotelId);
    console.log("Fetched settings from DB:", settings);

    // Save to cache for 1 hour
    await redis.set("feedback", JSON.stringify(settings), {
      ex: 60,
    });
    if (settings?.startTime && settings?.endTime) {
      showFeedbackPrompt =
        hour >= settings?.startTime && hour < settings?.endTime;
    }
  } else {
    console.log("hour");
    // await redis.set(
    //   "feedback",
    //   JSON.stringify({ endTime: "20", startTime: "19" }),
    //   {
    //     ex: 60,
    //   }
    // );
    showFeedbackPrompt =
      hour >= settings?.startTime && hour < settings?.endTime; // 7–8 PM
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
