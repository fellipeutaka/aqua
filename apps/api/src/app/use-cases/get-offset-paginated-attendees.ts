import type { AttendeesRepository } from "../repositories/attendees-repository";
import type { EventsRepository } from "../repositories/events-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetOffsetPaginatedAttendeesUseCaseRequest {
  eventId: string;
  pageIndex: number;
  query: string | null;
}

export class GetOffsetPaginatedAttendeesUseCase {
  constructor(
    private attendeesRepository: AttendeesRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    eventId,
    pageIndex,
    query,
  }: GetOffsetPaginatedAttendeesUseCaseRequest) {
    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new ResourceNotFoundError();
    }

    const [attendees, total] = await Promise.all([
      this.attendeesRepository.findManyWithOffset({
        eventId,
        pageIndex,
        query,
      }),
      this.attendeesRepository.count(eventId),
    ]);

    return {
      attendees,
      total,
    };
  }
}
