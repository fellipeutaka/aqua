import type { Event } from "../entities/event";

export interface EventsRepository {
  findById(eventId: string): Promise<Event | null>;
  findByIdWithAttendeesAmount(eventId: string): Promise<{
    event: Event;
    attendeesAmount: number;
  } | null>;
  findBySlug(slug: string): Promise<Event | null>;
  create(event: Event): Promise<{ eventId: string }>;
}
