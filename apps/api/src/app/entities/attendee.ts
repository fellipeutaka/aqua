import { ulid } from "~/utils/ulid";

export interface AttendeeProps {
  name: string;
  email: string;
  eventId: string;
  createdAt: Date;
  checkInAt: Date | null;
}

export class Attendee {
  private readonly _id: string;
  private readonly props: AttendeeProps;

  constructor(props: AttendeeProps, id?: string) {
    this._id = id ?? ulid();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get eventId() {
    return this.props.eventId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get checkInAt() {
    return this.props.checkInAt;
  }

  checkIn() {
    this.props.checkInAt = new Date();
  }
}
