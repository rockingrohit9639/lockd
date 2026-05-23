import { toNodeHandler } from "better-auth/node";
import { defineEventHandler } from "h3";
import { auth } from "../../../lib/auth";

const handler = toNodeHandler(auth);

export default defineEventHandler((event) => {
  // @ts-expect-error h3 v2 node compat
  return handler(event.node!.req, event.node!.res);
});
