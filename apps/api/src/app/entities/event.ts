export interface EventProps {
  title: string;
  details: string | null;
  slug: string;
  maximumAttendees: number | null;
}

export class Event {
  private readonly _id: string;
  private readonly props: EventProps;

  constructor(props: EventProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this.props.title;
  }

  get details() {
    return this.props.details;
  }

  get slug() {
    return this.props.slug;
  }

  get maximumAttendees() {
    return this.props.maximumAttendees;
  }
}
