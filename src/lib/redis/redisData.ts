"use server";
import { redis } from "./redis";

export async function getAuthData() {
  const data = await redis.get("feedback");
  return data;
}
