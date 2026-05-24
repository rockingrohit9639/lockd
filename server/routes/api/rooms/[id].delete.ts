import { and, eq } from "drizzle-orm";
import { createError, defineEventHandler, getRouterParam } from "h3";
import { db } from "../../../../src/db";
import { room } from "../../../../src/db/schema";
import { getServerSession } from "../../../lib/session";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing room id" });
  }

  await db
    .delete(room)
    .where(and(eq(room.id, id), eq(room.authorId, session.user.id)));

  return { success: true };
});
