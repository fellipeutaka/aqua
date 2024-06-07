DROP INDEX IF EXISTS "name_index";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_index" ON "attendee" USING btree (name);