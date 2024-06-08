import { DataTableSkeleton } from "~/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <main className="container space-y-2.5 pt-6 pb-8 md:py-8">
      <h1 className="font-bold text-2xl">Attendees</h1>
      <DataTableSkeleton
        columnCount={5}
        searchableColumnCount={1}
        showViewOptions={false}
      />
    </main>
  );
}
