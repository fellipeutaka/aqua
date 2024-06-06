import { z } from "@hono/zod-openapi";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DATABASE_URL: z.string().url(),
});

export function getEnv(data: unknown) {
  const env = envSchema.safeParse(data);

  if (!env.success) {
    console.error(
      "❌ Invalid environment variables:",
      env.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  return env.data;
}
