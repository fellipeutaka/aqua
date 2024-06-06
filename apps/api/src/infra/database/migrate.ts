import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { getEnv } from "~/env";

try {
  console.info("⏳ Running migrations...");

  const start = Date.now();

  const { DATABASE_URL } = getEnv(process.env);
  const client = neon(DATABASE_URL);
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "drizzle" });

  const end = Date.now();

  console.info(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
} catch (err) {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
}
