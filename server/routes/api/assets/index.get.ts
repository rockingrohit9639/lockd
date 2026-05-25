import { createError, defineEventHandler } from "h3";
import { eq } from "drizzle-orm";
import { db } from "../../../../src/db";
import { asset } from "../../../../src/db/schema";
import { getServerSession } from "../../../lib/session";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const assets = await db
    .select()
    .from(asset)
    .where(eq(asset.authorId, session.user.id))
    .orderBy(asset.createdAt);

  return assets;
});
