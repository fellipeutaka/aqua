import type { Attendee } from "../entities/attendee";

export interface AttendeesRepository {
  findByEmail(props: {
    email: string;
    eventId: string;
  }): Promise<Attendee | null>;
  findById(attendeeId: string): Promise<Attendee | null>;
  findByIdWithTitle(attendeeId: string): Promise<{
    attendee: Attendee;
    event: {
      title: string;
    };
  } | null>;
  count(eventId: string): Promise<number>;
  create(attendee: Attendee): Promise<{ attendeeId: string }>;
  update(attendee: Attendee): Promise<void>;
}
