import { OpenAPIHono } from "@hono/zod-openapi";
import { createEvent } from "./create-event";
import { getEvent } from "./get-event";
import { getEventAttendees } from "./get-event-attendees";
import { getEvents } from "./get-events";
import { registerForEvent } from "./register-for-event";

export const eventsRoutes = new OpenAPIHono()
  .route("", getEvents)
  .route("", getEvent)
  .route("", createEvent)
  .route("", registerForEvent)
  .route("", getEventAttendees);
