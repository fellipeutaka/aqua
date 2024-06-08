import { api } from "~/lib/hono";

export interface GetEventAttendeesProps {
  eventId: string;
  query?: string;
  page: string;
  pageSize?: string;
}

export async function getEventAttendees({
  eventId,
  query,
  page,
  pageSize,
}: GetEventAttendeesProps) {
  const response = await api.events[":eventId"].attendees.$get(
    {
      param: {
        eventId,
      },
      query: { query, page, pageSize },
    },
    {
      init: {
        next: {
          revalidate: 30,
        },
      },
    },
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  const data = await response.json();
  throw new Error(data.message);
}

export type Attendee = Awaited<
  ReturnType<typeof getEventAttendees>
>["attendees"][number];
