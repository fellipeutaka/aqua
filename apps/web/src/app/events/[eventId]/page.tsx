import { ButtonStyles } from "@aqua/ui/button";
import Link from "next/link";
import { getEvent } from "~/services/events";

export interface EventsPageProps {
  params: {
    eventId: string;
  };
}

export default async function Page({ params }: EventsPageProps) {
  const event = await getEvent(params.eventId);

  return (
    <main className="container space-y-2.5 pt-6 pb-8 md:py-8">
      <h1 className="font-bold text-2xl">{event.title}</h1>
      <p className="text-pretty text-muted-foreground text-sm">
        {event.details}
      </p>
      <p className="text-pretty text-muted-foreground text-sm">
        {event.attendeesAmount} of {event.maximumAttendees ?? "∞"} attendees
      </p>

      <Link
        className={ButtonStyles({
          variant: "outline",
        })}
        href={`/events/${params.eventId}/attendees`}
      >
        View Attendees
      </Link>
    </main>
  );
}
