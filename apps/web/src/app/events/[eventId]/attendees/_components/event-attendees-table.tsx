"use client";

import { DataTable } from "~/components/data-table/data-table";
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar";
import { useDataTable } from "~/hooks/use-data-table";
import type { DataTableFilterField } from "~/lib/tanstack-table";
import type { Attendee, getEventAttendees } from "~/services/attendees";
import { columns } from "./event-attendees-table-columns";

interface EventAttendeesTableProps {
  data: Awaited<ReturnType<typeof getEventAttendees>>;
}

const filterFields: DataTableFilterField<Attendee>[] = [
  {
    label: "Name",
    value: "name",
    placeholder: "Search attendee...",
  },
];

export function EventAttendeesTable({ data }: EventAttendeesTableProps) {
  const { attendees, total } = data;

  const { table } = useDataTable({
    data: attendees,
    columns,
    pageCount: Math.ceil(total / 10),
    filterFields,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields} />
    </DataTable>
  );
}
