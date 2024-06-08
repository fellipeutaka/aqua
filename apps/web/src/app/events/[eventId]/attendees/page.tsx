import { z } from "zod";
import { getEventAttendees } from "~/services/attendees";
import type { EventsPageProps } from "../page";
import { EventAttendeesTable } from "./_components/event-attendees-table";

interface PageProps extends EventsPageProps {
  searchParams: {
    name?: string;
    page?: string;
    per_page?: string;
  };
}

const searchParamsSchema = z.object({
  name: z.string().optional(),
  page: z
    .string()
    .optional()
    .default("1")
    .transform(Number)
    .pipe(z.number().int().positive()),
});

export default async function Page({ params, searchParams }: PageProps) {
  const { name, page } = searchParamsSchema.parse(searchParams);
  const { attendees, total } = await getEventAttendees({
    eventId: params.eventId,
    query: name,
    pageIndex: String(page - 1),
  });

  return (
    <main className="container space-y-2.5 pt-6 pb-8 md:py-8">
      <h1 className="font-bold text-2xl">Attendees</h1>
      <EventAttendeesTable
        data={{
          attendees,
          total,
        }}
      />
    </main>
  );
}
