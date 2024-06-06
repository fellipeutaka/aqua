import { defineConfig } from "drizzle-kit";
import { getEnv } from "~/env";

const { DATABASE_URL } = getEnv(process.env);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/infra/database/schema/*",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
