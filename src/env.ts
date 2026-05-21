import * as z from "zod/v4";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(16),
  BETTER_AUTH_URL: z.url(),
});

export const env = envSchema.parse(process.env);
