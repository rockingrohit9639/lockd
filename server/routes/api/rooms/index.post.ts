import { createError, defineEventHandler, readBody } from "h3";
import { db } from "../../../../src/db";
import { room } from "../../../../src/db/schema";
import { getServerSession } from "../../../lib/session";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const body = await readBody<{ id: string; name: string; description?: string; data: unknown }>(event);
  if (!body?.id || !body?.name || !body?.data) {
    throw createError({ statusCode: 400, message: "Missing required fields" });
  }

  const [created] = await db
    .insert(room)
    .values({
      id: body.id,
      name: body.name,
      description: body.description ?? "",
      data: body.data,
      authorId: session.user.id,
    })
    .onConflictDoUpdate({
      target: room.id,
      set: {
        name: body.name,
        description: body.description ?? "",
        data: body.data,
        updatedAt: new Date(),
      },
    })
    .returning({ id: room.id });

  return { id: created.id };
});
