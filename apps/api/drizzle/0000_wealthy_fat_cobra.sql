CREATE TABLE IF NOT EXISTS "attendee" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"event_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"check_in_at" timestamp,
	CONSTRAINT "attendee_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"details" text,
	"slug" text NOT NULL,
	"maximum_attendees" integer,
	CONSTRAINT "events_id_unique" UNIQUE("id"),
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendee" ADD CONSTRAINT "attendee_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_index" ON "attendee" USING gin (to_tsvector('simple', "name"));