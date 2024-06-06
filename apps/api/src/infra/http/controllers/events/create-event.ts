import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { DrizzleEventsRepository } from "~/app/repositories/drizzle/drizzle-events-repository";
import { CreateEventUseCase } from "~/app/use-cases/create-event";
import { ResourceAlreadyExistsError } from "~/app/use-cases/errors/resource-already-exists-error";
import { getDb } from "~/infra/database";
import { tags } from "~/utils/tags";

export const createEvent = new OpenAPIHono().openapi(
  createRoute({
    summary: "Create an event",
    tags: [tags.events],
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              title: z.string().min(4),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().positive().nullable(),
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
              eventId: z.string().uuid(),
            }),
          },
        },
        description: "Event created",
      },
      400: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Event already exists",
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
    const { title, details, maximumAttendees } = c.req.valid("json");

    const db = getDb(c);
    const createEventUseCase = new CreateEventUseCase(
      new DrizzleEventsRepository(db),
    );

    try {
      const { eventId } = await createEventUseCase.execute({
        title,
        details,
        maximumAttendees,
      });

      return c.json({ eventId }, 201);
    } catch (error) {
      if (error instanceof ResourceAlreadyExistsError) {
        return c.json(
          { message: "Another event with same title already exists." },
          400,
        );
      }
      return c.json({ message: "Internal server error." }, 500);
    }
  },
);
