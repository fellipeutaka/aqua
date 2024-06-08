import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { DrizzleEventsRepository } from "~/app/repositories/drizzle/drizzle-events-repository";
import { GetEventsUseCase } from "~/app/use-cases/get-events";
import { getDb } from "~/infra/database";
import { tags } from "~/utils/tags";

export const getEvents = new OpenAPIHono().openapi(
  createRoute({
    summary: "Get all events",
    tags: [tags.events],
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z
              .object({
                id: z.string(),
                title: z.string(),
                slug: z.string(),
                details: z.string().nullable(),
                maximumAttendees: z.number().int().nullable(),
              })
              .array(),
          },
        },
        description: "Success",
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
    const db = getDb(c);
    const getEventsUseCase = new GetEventsUseCase(
      new DrizzleEventsRepository(db),
    );

    try {
      const { events } = await getEventsUseCase.execute();

      return c.json(
        events.map((event) => ({
          id: event.id,
          title: event.title,
          slug: event.slug,
          details: event.details,
          maximumAttendees: event.maximumAttendees,
        })),
        200,
      );
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "Internal server error.",
        },
        500,
      );
    }
  },
);
