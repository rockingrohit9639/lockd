import { createError, defineEventHandler, getRouterParam } from "h3";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../src/db";
import { asset } from "../../../../src/db/schema";
import { getServerSession } from "../../../lib/session";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing asset ID" });
  }

  const deleted = await db
    .delete(asset)
    .where(and(eq(asset.id, id), eq(asset.authorId, session.user.id)))
    .returning({ id: asset.id });

  if (deleted.length === 0) {
    throw createError({ statusCode: 404, message: "Asset not found" });
  }

  return { deleted: true };
});
