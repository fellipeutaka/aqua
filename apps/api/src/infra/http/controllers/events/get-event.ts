import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { DrizzleEventsRepository } from "~/app/repositories/drizzle/drizzle-events-repository";
import { ResourceNotFoundError } from "~/app/use-cases/errors/resource-not-found-error";
import { GetEventByIdUseCase } from "~/app/use-cases/get-event-by-id";
import { getDb } from "~/infra/database";
import { tags } from "~/utils/tags";

export const getEvent = new OpenAPIHono().openapi(
  createRoute({
    summary: "Get an event",
    tags: [tags.events],
    method: "get",
    path: "/:eventId",
    request: {
      params: z.object({
        eventId: z.string().uuid(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().nullable(),
              attendeesAmount: z.number().int(),
            }),
          },
        },
        description: "Event found",
      },
      400: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Event not found",
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

    const db = getDb(c);
    const getEventByIdUseCase = new GetEventByIdUseCase(
      new DrizzleEventsRepository(db),
    );

    try {
      const { event, attendeesAmount } = await getEventByIdUseCase.execute({
        eventId,
      });

      return c.json(
        {
          title: event.title,
          slug: event.slug,
          details: event.details,
          maximumAttendees: event.maximumAttendees,
          attendeesAmount,
        },
        200,
      );
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return c.json(
          {
            message: "Event not found.",
          },
          400,
        );
      }
      return c.json(
        {
          message: "Internal server error.",
        },
        500,
      );
    }
  },
);
