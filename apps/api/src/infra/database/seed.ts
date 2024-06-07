import { faker } from "@faker-js/faker";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getEnv } from "~/env";
import { generateSlug } from "~/utils/generate-slug";
import { ulid } from "~/utils/ulid";
import { type NewAttendee, attendees } from "./schema/attendee";
import { events } from "./schema/event";

try {
  console.info("⏳ Seeding database...");

  const start = Date.now();

  const { DATABASE_URL } = getEnv(process.env);
  const client = neon(DATABASE_URL);
  const db = drizzle(client);

  const eventId = crypto.randomUUID();

  await db.delete(events);

  const eventTitle = "TypeScript Conf";
  const eventSlug = generateSlug(eventTitle);
  const maximumAttendees = 32;

  await db.insert(events).values({
    id: eventId,
    title: eventTitle,
    slug: eventSlug,
    details: "The best TypeScript conference in the world!",
    maximumAttendees,
  });

  const attendeesToInsert: NewAttendee[] = [];

  for (let i = 0; i < maximumAttendees - 1; i++) {
    attendeesToInsert.push({
      id: ulid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      eventId,
      createdAt: faker.date.recent({
        days: 30,
      }),
      checkInAt: faker.helpers.maybe(() =>
        faker.date.recent({
          days: 7,
        }),
      ),
    });
  }

  await db.insert(attendees).values(attendeesToInsert);

  const end = Date.now();

  console.info(`✅ Database seeded in ${end - start}ms`);

  process.exit(0);
} catch (err) {
  console.error("❌ Seeding failed");
  console.error(err);
  process.exit(1);
}
