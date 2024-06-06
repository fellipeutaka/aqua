import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { Context } from "hono";
import { getEnv } from "~/env";

export function getDb(c: Context) {
  const { DATABASE_URL } = getEnv(c.env);

  const client = neon(DATABASE_URL);
  return drizzle(client);
}
