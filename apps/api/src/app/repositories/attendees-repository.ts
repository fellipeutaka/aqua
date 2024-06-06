import type { Attendee } from "../entities/attendee";

export interface AttendeesRepository {
  findByEmail(props: {
    email: string;
    eventId: string;
  }): Promise<Attendee | null>;
  count(eventId: string): Promise<number>;
  create(attendee: Attendee): Promise<{ attendeeId: string }>;
}
