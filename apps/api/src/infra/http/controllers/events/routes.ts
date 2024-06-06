import { OpenAPIHono } from "@hono/zod-openapi";
import { createEvent } from "./create-event";
import { getEvent } from "./get-event";
import { registerForEvent } from "./register-for-event";

export const eventsRoutes = new OpenAPIHono()
  .route("", getEvent)
  .route("", createEvent)
  .route("", registerForEvent);