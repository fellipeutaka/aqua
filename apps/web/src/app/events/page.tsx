import { ButtonStyles } from "@aqua/ui/button";
import Link from "next/link";
import { getEvents } from "~/services/events";

export default async function Page() {
  const events = await getEvents();

  return (
    <main className="container space-y-2.5 pt-6 pb-8 md:py-8">
      <h1 className="font-bold text-2xl">Events</h1>

      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-center justify-between rounded-md border p-4 shadow-sm"
        >
          <div>
            <h2 className="font-bold text-lg">{event.title}</h2>
            <p className="text-pretty text-muted-foreground text-sm">
              {event.details}
            </p>
          </div>
          <div>
            <Link
              className={ButtonStyles({
                size: "sm",
                variant: "outline",
              })}
              href={`/events/${event.id}`}
            >
              View Event
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
