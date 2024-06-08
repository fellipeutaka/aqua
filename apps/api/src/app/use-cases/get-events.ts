import type { EventsRepository } from "../repositories/events-repository";

export class GetEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute() {
    const events = await this.eventsRepository.findMany();

    return { events };
  }
}
