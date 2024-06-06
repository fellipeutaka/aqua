import { generateSlug } from "~/utils/generate-slug";
import { Event } from "../entities/event";
import type { EventsRepository } from "../repositories/events-repository";
import { ResourceAlreadyExistsError } from "./errors/resource-already-exists-error";

interface CreateEventUseCaseRequest {
  title: string;
  details: string | null;
  maximumAttendees: number | null;
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    title,
    details,
    maximumAttendees,
  }: CreateEventUseCaseRequest) {
    const slug = generateSlug(title);
    const eventAlreadyExists = await this.eventsRepository.findBySlug(slug);

    if (eventAlreadyExists) {
      throw new ResourceAlreadyExistsError();
    }

    const { eventId } = await this.eventsRepository.create(
      new Event({
        title,
        details,
        maximumAttendees,
        slug,
      }),
    );

    return {
      eventId,
    };
  }
}
