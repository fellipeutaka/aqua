import { count, eq } from "drizzle-orm";
import type { Event } from "~/app/entities/event";
import type { getDb } from "~/infra/database";
import { attendees } from "~/infra/database/schema/attendee";
import { events } from "~/infra/database/schema/event";
import type { EventsRepository } from "../events-repository";
import { DrizzleEventMapper } from "./mappers/drizzle-event-mapper";

export class DrizzleEventsRepository implements EventsRepository {
  constructor(private readonly db: ReturnType<typeof getDb>) {}

  async findById(eventId: string) {
    const event = await this.db
      .select()
      .from(events)
      .where(eq(events.id, eventId))
      .then((rows) => rows.at(0) ?? null);

    if (!event) {
      return null;
    }

    return DrizzleEventMapper.toDomain(event);
  }

  async findByIdWithAttendeesAmount(eventId: string) {
    const event = await this.db
      .select({
        id: events.id,
        title: events.title,
        slug: events.slug,
        details: events.details,
        maximumAttendees: events.maximumAttendees,
        attendeesAmount: count(attendees.id),
      })
      .from(events)
      .where(eq(events.id, eventId))
      .leftJoin(attendees, eq(events.id, attendees.eventId))
      .groupBy(events.id)
      .then((rows) => rows.at(0) ?? null);

    if (!event) {
      return null;
    }

    return {
      event: DrizzleEventMapper.toDomain(event),
      attendeesAmount: event.attendeesAmount,
    };
  }

  async findBySlug(slug: string) {
    const event = await this.db
      .select()
      .from(events)
      .where(eq(events.slug, slug))
      .then((rows) => rows.at(0) ?? null);

    if (!event) {
      return null;
    }

    return DrizzleEventMapper.toDomain(event);
  }

  async create(event: Event) {
    await this.db.insert(events).values(DrizzleEventMapper.toDrizzle(event));

    return { eventId: event.id };
  }
}
