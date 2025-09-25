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
  const hour = now.getHours();

  if (!settings?.startTime || !settings?.endTime) {
    // Fallback: fetch from DB
    settings = await getFeedbackSettings(hotelId);
    console.log("settings", settings);

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
    showFeedbackPrompt =
      hour >= settings?.startTime && hour < settings?.endTime; // 7–8 PM
  }

  return Response.json({ showFeedbackPrompt });
}
// export async function GET() {
//   const now = new Date();
//   const hour = now.getHours();

//   const showFeedbackPrompt = hour >= 18 && hour < 20; // 7–8 PM
//   return Response.json({ showFeedbackPrompt });
// }
