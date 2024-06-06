import { Attendee } from "../entities/attendee";
import type { AttendeesRepository } from "../repositories/attendees-repository";
import type { EventsRepository } from "../repositories/events-repository";
import { BadRequest } from "./errors/bad-request";

interface RegisterForEventUseCaseRequest {
  eventId: string;
  name: string;
  email: string;
}

export class RegisterForEventUseCase {
  constructor(
    private attendeesRepository: AttendeesRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({ eventId, name, email }: RegisterForEventUseCaseRequest) {
    const attendeeFromEmail = await this.attendeesRepository.findByEmail({
      email,
      eventId,
    });

    if (attendeeFromEmail) {
      throw new BadRequest("This e-mail is already registered for this event.");
    }

    const [event, amountOfAttendeesForEvent] = await Promise.all([
      this.eventsRepository.findById(eventId),
      this.attendeesRepository.count(eventId),
    ]);

    if (
      event?.maximumAttendees &&
      amountOfAttendeesForEvent >= event.maximumAttendees
    ) {
      throw new BadRequest(
        "The maximum number of attendees for this event has been reached.",
      );
    }

    const { attendeeId } = await this.attendeesRepository.create(
      new Attendee({
        name,
        email,
        eventId,
        createdAt: new Date(),
        checkInAt: null,
      }),
    );

    return { attendeeId };
  }
}
