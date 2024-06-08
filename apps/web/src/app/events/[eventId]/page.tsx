export interface EventsPageProps {
  params: {
    eventId: string;
  };
}

export default function Page({ params }: EventsPageProps) {
  return (
    <main className="container space-y-2.5 pt-6 pb-8 md:py-8">
      <h1 className="font-bold text-2xl">Event {params.eventId}</h1>
    </main>
  );
}
