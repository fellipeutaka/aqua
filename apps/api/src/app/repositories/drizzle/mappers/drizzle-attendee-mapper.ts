import { Attendee } from "~/app/entities/attendee";
import type { Attendee as RawAttendee } from "~/infra/database/schema/attendee";

export class DrizzleAttendeeMapper {
  static toDrizzle(attendee: Attendee): RawAttendee {
    return {
      id: attendee.id,
      name: attendee.name,
      email: attendee.email,
      eventId: attendee.eventId,
      createdAt: attendee.createdAt,
      checkInAt: attendee.checkInAt,
    };
  }

  static toDomain(raw: RawAttendee): Attendee {
    return new Attendee(
      {
        name: raw.name,
        email: raw.email,
        eventId: raw.eventId,
        createdAt: raw.createdAt,
        checkInAt: raw.checkInAt,
      },
      raw.id,
    );
  }
}
