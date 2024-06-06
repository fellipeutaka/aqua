import { OpenAPIHono } from "@hono/zod-openapi";
import { checkIn } from "./check-in";
import { getAttendeeBadge } from "./get-attendee-badge";

export const attendeesRoutes = new OpenAPIHono()
  .route("", getAttendeeBadge)
  .route("", checkIn);
