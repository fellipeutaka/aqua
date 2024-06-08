import { count, eq } from "drizzle-orm";
import type { getDb } from "~/infra/database";
import { attendees } from "~/infra/database/schema/attendee";
import { events } from "~/infra/database/schema/event";
import type { EventsRepository } from "../events-repository";
import { DrizzleEventMapper } from "./mappers/drizzle-event-mapper";

type Props<T extends keyof EventsRepository> = Parameters<
  EventsRepository[T]
>[0];

export class DrizzleEventsRepository implements EventsRepository {
  constructor(private readonly db: ReturnType<typeof getDb>) {}

  async findMany() {
    const data = await this.db.select().from(events);

    return data.map(DrizzleEventMapper.toDomain);
  }

  async findById(eventId: Props<"findById">) {
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

  async findByIdWithAttendeesAmount(
    eventId: Props<"findByIdWithAttendeesAmount">,
  ) {
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

  async findBySlug(slug: Props<"findBySlug">) {
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

  async create(event: Props<"create">) {
    await this.db.insert(events).values(DrizzleEventMapper.toDrizzle(event));

    return { eventId: event.id };
  }
}
