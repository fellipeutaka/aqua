import { and, count, eq } from "drizzle-orm";
import type { Attendee } from "~/app/entities/attendee";
import type { getDb } from "~/infra/database";
import { attendees } from "~/infra/database/schema/attendee";
import type { AttendeesRepository } from "../attendees-repository";
import { DrizzleAttendeeMapper } from "./mappers/drizzle-attendee-mapper";

export class DrizzleAttendeesRepository implements AttendeesRepository {
  constructor(private readonly db: ReturnType<typeof getDb>) {}

  async findByEmail(props: {
    email: string;
    eventId: string;
  }) {
    const attendee = await this.db
      .select()
      .from(attendees)
      .where(
        and(
          eq(attendees.email, props.email),
          eq(attendees.eventId, props.eventId),
        ),
      )
      .then((rows) => rows.at(0) ?? null);

    if (!attendee) {
      return null;
    }

    return DrizzleAttendeeMapper.toDomain(attendee);
  }

  async count(eventId: string) {
    const [{ data }] = await this.db
      .select({
        data: count(attendees.id),
      })
      .from(attendees)
      .where(eq(attendees.eventId, eventId));

    return data;
  }

  async create(attendee: Attendee) {
    await this.db
      .insert(attendees)
      .values(DrizzleAttendeeMapper.toDrizzle(attendee));

    return {
      attendeeId: attendee.id,
    };
  }
}
