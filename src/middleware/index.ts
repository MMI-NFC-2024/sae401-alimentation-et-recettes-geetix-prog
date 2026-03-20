import PocketBase from "pocketbase";

import { defineMiddleware } from "astro/middleware";

const pocketbaseUrl = import.meta.env.POCKETBASE_URL;


export const onRequest = defineMiddleware(
  async ({ locals, request, isPrerendered }: any, next: () => any) => {
    locals.pb = new PocketBase(pocketbaseUrl);

    if (!isPrerendered) {
      locals.pb.authStore.loadFromCookie(request.headers.get("cookie") || "");

      try {
        locals.pb.authStore.isValid &&
          (await locals.pb.collection("users").authRefresh());
      } catch (_) {
        locals.pb.authStore.clear();
      }
    }

    const response = await next();

    if (!isPrerendered) {
      response.headers.append(
        "set-cookie",
        locals.pb.authStore.exportToCookie(),
      );
    }

    return response;
  },
);