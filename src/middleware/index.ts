import { defineMiddleware } from "astro/middleware";
import { createPb } from "../utils/pb";

export const onRequest = defineMiddleware(
  async ({ locals, request, isPrerendered }: any, next: () => any) => {
    locals.pb = createPb();

    if (!isPrerendered) {
      locals.pb.authStore.loadFromCookie(request.headers.get("cookie") || "");

      try {
        locals.pb.authStore.isValid &&
          (await locals.pb.collection("users").authRefresh({ requestKey: null }));
      } catch (_) {
        locals.pb.authStore.clear();
      }
    }

    const response = await next();

    if (!isPrerendered) {
      response.headers.append(
        "set-cookie",
        locals.pb.authStore.exportToCookie({ maxAge: 2592000 }),
      );
    }

    return response;
  },
);