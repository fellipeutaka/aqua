import { z } from "zod";
import { parseZodSchema } from "~/lib/zod";
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
    .pipe(z.number().int().positive())
    .transform(String),
  per_page: z
    .string()
    .optional()
    .default("10")
    .transform(Number)
    .pipe(z.number().int().positive().max(50))
    .transform(String),
});

export default async function Page({ params, searchParams }: PageProps) {
  const { name, page, per_page } = parseZodSchema(
    searchParamsSchema,
    searchParams,
  );
  const { attendees, total } = await getEventAttendees({
    eventId: params.eventId,
    query: name,
    page,
    pageSize: per_page,
  });

  return (
    <main className="container space-y-2.5 pt-6 pb-8 md:py-8">
      <h1 className="font-bold text-2xl">Attendees</h1>
      <EventAttendeesTable
        data={{
          attendees,
          total,
        }}
        pageSize={Number(per_page)}
      />
    </main>
  );
}
