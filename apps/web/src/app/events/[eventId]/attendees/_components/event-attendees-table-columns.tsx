import type { ColumnDef } from "@tanstack/react-table";
import type { Attendee } from "~/services/attendees";
import { formatRelativeDate } from "~/utils/date";

export const columns: ColumnDef<Attendee>[] = [
  {
    accessorKey: "id",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Registered Date",
    cell: ({ row }) => formatRelativeDate(row.original.createdAt),
  },
  {
    accessorKey: "checkInAt",
    header: "Check-in Date",
    cell: ({ row }) =>
      row.original.checkInAt ? (
        formatRelativeDate(row.original.checkInAt)
      ) : (
        <span className="text-muted-foreground">Not checked in</span>
      ),
  },
];
