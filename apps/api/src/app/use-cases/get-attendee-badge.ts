import type { AttendeesRepository } from "../repositories/attendees-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetAttendeeBadgeUseCaseRequest {
  attendeeId: string;
  baseURL: string;
}

export class GetAttendeeBadgeUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute({ attendeeId, baseURL }: GetAttendeeBadgeUseCaseRequest) {
    const data = await this.attendeesRepository.findByIdWithTitle(attendeeId);

    if (!data) {
      throw new ResourceNotFoundError();
    }

    const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);

    return {
      name: data.attendee.name,
      email: data.attendee.email,
      eventTitle: data.event.title,
      checkInURL: checkInURL.toString(),
    };
  }
}
