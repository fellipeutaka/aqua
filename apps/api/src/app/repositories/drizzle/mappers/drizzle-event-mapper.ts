import { Event } from "~/app/entities/event";
import type { Event as RawEvent } from "~/infra/database/schema/event";

export class DrizzleEventMapper {
  static toDrizzle(event: Event): RawEvent {
    return {
      id: event.id,
      title: event.title,
      details: event.details,
      slug: event.slug,
      maximumAttendees: event.maximumAttendees,
    };
  }

  static toDomain(raw: RawEvent): Event {
    return new Event(
      {
        title: raw.title,
        details: raw.details,
        slug: raw.slug,
        maximumAttendees: raw.maximumAttendees,
      },
      raw.id,
    );
  }
}
