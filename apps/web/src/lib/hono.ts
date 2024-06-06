import type { AppType } from "@aqua/api";
import { hc } from "hono/client";
import { env } from "~/env";

export const api = hc<AppType>(env.API_URL);
