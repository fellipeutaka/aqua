import type { EventsRepository } from "../repositories/events-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetEventByIdUseCaseRequest {
  eventId: string;
}

export class GetEventByIdUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({ eventId }: GetEventByIdUseCaseRequest) {
    const data =
      await this.eventsRepository.findByIdWithAttendeesAmount(eventId);

    if (!data) {
      throw new ResourceNotFoundError();
    }

    return {
      event: data.event,
      attendeesAmount: data.attendeesAmount,
    };
  }
}
