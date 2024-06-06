import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { DrizzleAttendeesRepository } from "~/app/repositories/drizzle/drizzle-attendees-repository";
import { DrizzleEventsRepository } from "~/app/repositories/drizzle/drizzle-events-repository";
import { BadRequest } from "~/app/use-cases/errors/bad-request";
import { RegisterForEventUseCase } from "~/app/use-cases/register-for-event";
import { getDb } from "~/infra/database";
import { tags } from "~/utils/tags";

export const registerForEvent = new OpenAPIHono().openapi(
  createRoute({
    summary: "Register an attendee",
    tags: [tags.attendees],
    method: "post",
    path: "/:eventId/attendees",
    request: {
      params: z.object({
        eventId: z.string().uuid(),
      }),
      body: {
        content: {
          "application/json": {
            schema: z.object({
              name: z.string().min(4),
              email: z.string().email(),
            }),
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: z.object({
              attendeeId: z.string(),
            }),
          },
        },
        description: "Attendee registered",
      },
      400: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Bad request",
      },
      500: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Internal server error",
      },
    },
  }),
  async (c) => {
    const { eventId } = c.req.valid("param");
    const { name, email } = c.req.valid("json");

    const db = getDb(c);
    const registerForEventUseCase = new RegisterForEventUseCase(
      new DrizzleAttendeesRepository(db),
      new DrizzleEventsRepository(db),
    );

    try {
      const { attendeeId } = await registerForEventUseCase.execute({
        eventId,
        name,
        email,
      });

      return c.json({ attendeeId }, 201);
    } catch (error) {
      if (error instanceof BadRequest) {
        return c.json({ message: error.message }, 400);
      }
      return c.json({ message: "Internal server error." }, 500);
    }
  },
);
