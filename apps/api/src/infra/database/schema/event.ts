import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id").unique().primaryKey(),
  title: text("title").notNull(),
  details: text("details"),
  slug: text("slug").notNull().unique(),
  maximumAttendees: integer("maximum_attendees"),
});

export type Event = typeof events.$inferSelect;
