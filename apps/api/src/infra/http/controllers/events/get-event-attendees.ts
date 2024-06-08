import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { DrizzleAttendeesRepository } from "~/app/repositories/drizzle/drizzle-attendees-repository";
import { DrizzleEventsRepository } from "~/app/repositories/drizzle/drizzle-events-repository";
import { ResourceNotFoundError } from "~/app/use-cases/errors/resource-not-found-error";
import { GetOffsetPaginatedAttendeesUseCase } from "~/app/use-cases/get-offset-paginated-attendees";
import { getDb } from "~/infra/database";
import { tags } from "~/utils/tags";

export const getEventAttendees = new OpenAPIHono().openapi(
  createRoute({
    summary: "Get event attendees",
    tags: [tags.events],
    method: "get",
    path: "/:eventId/attendees",
    request: {
      params: z.object({
        eventId: z.string().uuid(),
      }),
      query: z.object({
        query: z
          .string()
          .optional()
          .transform((x) => x ?? null),
        page: z
          .string()
          .optional()
          .default("1")
          .transform(Number)
          .pipe(z.number().int().positive()),
        pageSize: z
          .string()
          .optional()
          .default("10")
          .transform(Number)
          .pipe(z.number().int().positive().max(50)),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              attendees: z.array(
                z.object({
                  id: z.string().ulid(),
                  name: z.string(),
                  email: z.string().email(),
                  createdAt: z.string().datetime(),
                  checkInAt: z.string().datetime().nullable(),
                }),
              ),
              total: z.number(),
            }),
          },
        },
        description: "Event found",
      },
      404: {
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
    const { query, page, pageSize } = c.req.valid("query");

    const db = getDb(c);
    const getEventByIdUseCase = new GetOffsetPaginatedAttendeesUseCase(
      new DrizzleAttendeesRepository(db),
      new DrizzleEventsRepository(db),
    );

    try {
      const { attendees, total } = await getEventByIdUseCase.execute({
        eventId,
        query,
        page,
        pageSize,
      });

      return c.json(
        {
          attendees: attendees.map((attendee) => ({
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.createdAt.toISOString(),
            checkInAt: attendee.checkInAt?.toISOString() ?? null,
          })),
          total,
        },
        200,
      );
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return c.json(
          {
            message: "Event not found.",
          },
          404,
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
