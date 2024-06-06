import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { events } from "./event";

export const attendees = pgTable(
  "attendee",
  {
    id: text("id").unique().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    checkInAt: timestamp("check_in_at"),
  },
  (table) => ({
    nameIndex: index("name_index").using(
      "gin",
      sql`to_tsvector('simple', ${table.name})`,
    ),
    emailIndex: uniqueIndex("email_index").on(table.email, table.eventId),
  }),
);

export type Attendee = typeof attendees.$inferSelect;
