import { and, count, desc, eq, ilike } from "drizzle-orm";
import type { getDb } from "~/infra/database";
import { attendees } from "~/infra/database/schema/attendee";
import { events } from "~/infra/database/schema/event";
import type { AttendeesRepository } from "../attendees-repository";
import { DrizzleAttendeeMapper } from "./mappers/drizzle-attendee-mapper";

type Props<T extends keyof AttendeesRepository> = Parameters<
  AttendeesRepository[T]
>[0];

export class DrizzleAttendeesRepository implements AttendeesRepository {
  constructor(private readonly db: ReturnType<typeof getDb>) {}

  async findByEmail(props: Props<"findByEmail">) {
    const attendee = await this.db
      .select({
        id: attendees.id,
        name: attendees.name,
        createdAt: attendees.createdAt,
        checkInAt: attendees.checkInAt,
      })
      .from(attendees)
      .where(
        and(
          eq(attendees.email, props.email),
          eq(attendees.eventId, props.eventId),
        ),
      )
      .then((rows) => rows.at(0) ?? null);

    if (!attendee) {
      return null;
    }

    return DrizzleAttendeeMapper.toDomain({
      ...attendee,
      eventId: props.eventId,
      email: props.email,
    });
  }

  async findById(attendeeId: Props<"findById">) {
    const attendee = await this.db
      .select()
      .from(attendees)
      .where(eq(attendees.id, attendeeId))
      .then((rows) => rows.at(0) ?? null);

    if (!attendee) {
      return null;
    }

    return DrizzleAttendeeMapper.toDomain(attendee);
  }

  async findByIdWithTitle(attendeeId: Props<"findByIdWithTitle">) {
    const data = await this.db
      .select({
        attendees,
        eventTitle: events.title,
      })
      .from(attendees)
      .where(eq(attendees.id, attendeeId))
      .leftJoin(events, eq(attendees.eventId, events.id))
      .then((rows) => rows.at(0) ?? null);

    if (!data) {
      return null;
    }

    return {
      attendee: DrizzleAttendeeMapper.toDomain(data.attendees),
      event: {
        // biome-ignore lint/style/noNonNullAssertion: Always guaranteed by the query
        title: data.eventTitle!,
      },
    };
  }

  async findManyWithOffset(props: Props<"findManyWithOffset">) {
    const defaultWhere = eq(attendees.eventId, props.eventId);
    const where = props.query
      ? and(ilike(attendees.name, `%${props.query}%`), defaultWhere)
      : defaultWhere;

    const pageSize = props.pageSize ?? 10;

    const data = await this.db
      .select({
        id: attendees.id,
        name: attendees.name,
        email: attendees.email,
        createdAt: attendees.createdAt,
        checkInAt: attendees.checkInAt,
      })
      .from(attendees)
      .where(where)
      .limit(pageSize)
      .offset((props.page - 1) * pageSize)
      .orderBy(desc(attendees.createdAt));

    return data.map((data) =>
      DrizzleAttendeeMapper.toDomain({ ...data, eventId: props.eventId }),
    );
  }

  async count(eventId: Props<"count">) {
    const [{ data }] = await this.db
      .select({
        data: count(attendees.id),
      })
      .from(attendees)
      .where(eq(attendees.eventId, eventId));

    return data;
  }

  async countWithQuery(props: Props<"countWithQuery">) {
    const defaultWhere = eq(attendees.eventId, props.eventId);
    const where = props.query
      ? and(ilike(attendees.name, `%${props.query}%`), defaultWhere)
      : defaultWhere;

    const [{ data }] = await this.db
      .select({
        data: count(attendees.id),
      })
      .from(attendees)
      .where(where);

    return data;
  }

  async create(attendee: Props<"create">) {
    await this.db
      .insert(attendees)
      .values(DrizzleAttendeeMapper.toDrizzle(attendee));

    return {
      attendeeId: attendee.id,
    };
  }

  async update(attendee: Props<"update">) {
    await this.db
      .update(attendees)
      .set(DrizzleAttendeeMapper.toDrizzle(attendee))
      .where(eq(attendees.id, attendee.id));
  }
}
