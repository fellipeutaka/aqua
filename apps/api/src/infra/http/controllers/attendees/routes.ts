import { OpenAPIHono } from "@hono/zod-openapi";
import { getAttendeeBadge } from "./get-attendee-badge";

export const attendeesRoutes = new OpenAPIHono().route("", getAttendeeBadge);
