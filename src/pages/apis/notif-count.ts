import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ count: 0 }), { status: 200 });
    }

    const url = new URL(request.url);
    const since = url.searchParams.get("since");

    let filter = "";
    if (since) {
        try {
            const pbDate = new Date(since).toISOString().replace("T", " ").split(".")[0];
            filter = `created > "${pbDate}"`;
        } catch {}
    }

    try {
        const result = await locals.pb.collection("Notifications").getList(1, 1, {
            filter: filter || undefined,
            requestKey: null,
        });
        return new Response(JSON.stringify({ count: result.totalItems }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ count: 0 }), { status: 200 });
    }
};
