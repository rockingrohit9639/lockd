import { eq, desc } from "drizzle-orm";
import { createError, defineEventHandler } from "h3";
import { db } from "../../../../src/db";
import { room } from "../../../../src/db/schema";
import { getServerSession } from "../../../lib/session";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const rooms = await db
    .select({
      id: room.id,
      name: room.name,
      description: room.description,
      published: room.published,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    })
    .from(room)
    .where(eq(room.authorId, session.user.id))
    .orderBy(desc(room.updatedAt));

  return rooms;
});
