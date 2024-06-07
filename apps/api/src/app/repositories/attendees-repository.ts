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
  findManyWithOffset(props: {
    eventId: string;
    query: string | null;
    pageIndex: number;
  }): Promise<Attendee[]>;
  count(eventId: string): Promise<number>;
  countWithQuery(props: {
    eventId: string;
    query: string | null;
  }): Promise<number>;
  create(attendee: Attendee): Promise<{ attendeeId: string }>;
  update(attendee: Attendee): Promise<void>;
}
