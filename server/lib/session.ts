import type { H3Event } from "h3";
import { auth } from "./auth";

export async function getServerSession(event: H3Event) {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  return session;
}
