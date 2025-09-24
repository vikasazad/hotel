import { jwtVerify } from "jose";

export async function authenticateToken(token: string, key: string) {
  const data = await jwtVerify(token, new TextEncoder().encode(key), {
    algorithms: ["HS256"],
  });
  return data;
}
