import { createError, defineEventHandler, readMultipartFormData } from "h3";
import { db } from "../../../../src/db";
import { asset } from "../../../../src/db/schema";
import { getServerSession } from "../../../lib/session";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, message: "No form data" });
  }

  const file = formData.find((f) => f.name === "file");
  const name = formData.find((f) => f.name === "name")?.data.toString();
  const type = formData.find((f) => f.name === "type")?.data.toString();

  if (!file || !file.data || !name || !type) {
    throw createError({ statusCode: 400, message: "Missing file, name, or type" });
  }

  const validTypes = ["sprite", "background", "character", "meme"];
  if (!validTypes.includes(type)) {
    throw createError({ statusCode: 400, message: "Invalid asset type" });
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.data.length > maxSize) {
    throw createError({ statusCode: 400, message: "File too large (max 5MB)" });
  }

  const mimeType = file.type || "image/png";
  const allowedMimes = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"];
  if (!allowedMimes.includes(mimeType)) {
    throw createError({ statusCode: 400, message: "Invalid file type" });
  }

  // Store as data URL (swap to R2 presigned upload later)
  const base64 = Buffer.from(file.data).toString("base64");
  const dataUrl = `data:${mimeType};base64,${base64}`;

  const id = `asset-${crypto.randomUUID().slice(0, 12)}`;

  const [created] = await db
    .insert(asset)
    .values({
      id,
      name,
      type,
      url: dataUrl,
      thumbnailUrl: dataUrl,
      tags: [],
      public: false,
      authorId: session.user.id,
    })
    .returning();

  return created;
});
