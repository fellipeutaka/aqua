import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { DrizzleAttendeesRepository } from "~/app/repositories/drizzle/drizzle-attendees-repository";
import { CheckInUseCase } from "~/app/use-cases/check-in";
import { BadRequest } from "~/app/use-cases/errors/bad-request";
import { ResourceNotFoundError } from "~/app/use-cases/errors/resource-not-found-error";
import { getDb } from "~/infra/database";
import { tags } from "~/utils/tags";

export const checkIn = new OpenAPIHono().openapi(
  createRoute({
    summary: "Check-in an attendee",
    tags: [tags.attendees],
    method: "get",
    path: "/:attendeeId/check-in",
    request: {
      params: z.object({
        attendeeId: z.string().ulid(),
      }),
    },
    responses: {
      201: {
        description: "Attendee badge",
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
    const { attendeeId } = c.req.valid("param");

    const db = getDb(c);
    const checkInUseCase = new CheckInUseCase(
      new DrizzleAttendeesRepository(db),
    );

    try {
      await checkInUseCase.execute({
        attendeeId,
      });

      return c.body(null, 201);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return c.json(
          {
            message: "Attendee not found.",
          },
          400,
        );
      }
      if (error instanceof BadRequest) {
        return c.json(
          {
            message: error.message,
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
