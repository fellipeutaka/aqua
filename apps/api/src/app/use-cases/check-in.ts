import type { AttendeesRepository } from "../repositories/attendees-repository";
import { BadRequest } from "./errors/bad-request";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
  attendeeId: string;
}

export class CheckInUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute({ attendeeId }: CheckInUseCaseRequest) {
    const attendee = await this.attendeesRepository.findById(attendeeId);

    if (!attendee) {
      throw new ResourceNotFoundError();
    }

    if (attendee.checkInAt) {
      throw new BadRequest("Attendee already checked in!");
    }

    attendee.checkIn();
    await this.attendeesRepository.update(attendee);
  }
}
