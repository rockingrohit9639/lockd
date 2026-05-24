import { eq } from "drizzle-orm";
import { createError, defineEventHandler, getRouterParam } from "h3";
import { db } from "../../../../src/db";
import { room } from "../../../../src/db/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing room id" });
  }

  const [found] = await db
    .select()
    .from(room)
    .where(eq(room.id, id))
    .limit(1);

  if (!found) {
    throw createError({ statusCode: 404, message: "Room not found" });
  }

  return found;
});
