import { api } from "~/lib/hono";

export async function getEvents() {
  const response = await api.events.$get(
    {},
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

export async function getEvent(eventId: string) {
  const response = await api.events[":eventId"].$get(
    {
      param: {
        eventId,
      },
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

export type Event = Awaited<ReturnType<typeof getEvents>>[number];
