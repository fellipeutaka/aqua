import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { DrizzleAttendeesRepository } from "~/app/repositories/drizzle/drizzle-attendees-repository";
import { ResourceNotFoundError } from "~/app/use-cases/errors/resource-not-found-error";
import { GetAttendeeBadgeUseCase } from "~/app/use-cases/get-attendee-badge";
import { getDb } from "~/infra/database";
import { tags } from "~/utils/tags";

export const getAttendeeBadge = new OpenAPIHono().openapi(
  createRoute({
    summary: "Get an attendee badge",
    tags: [tags.attendees],
    method: "get",
    path: "/:attendeeId/badge",
    request: {
      params: z.object({
        attendeeId: z.string().ulid(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url(),
            }),
          },
        },
        description: "Attendee badge",
      },
      404: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Attendee not found",
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
    const { attendeeId } = c.req.valid("param");

    const db = getDb(c);
    const getAttendeeBadgeUseCase = new GetAttendeeBadgeUseCase(
      new DrizzleAttendeesRepository(db),
    );

    try {
      const { name, email, eventTitle, checkInURL } =
        await getAttendeeBadgeUseCase.execute({
          attendeeId,
          baseURL: new URL(c.req.url).origin,
        });

      return c.json({ name, email, eventTitle, checkInURL }, 200);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return c.json(
          {
            message: "Attendee not found.",
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
