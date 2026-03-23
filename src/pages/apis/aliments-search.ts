import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.trim() ?? "";

    try {
        const results = await locals.pb.collection("Aliments").getList(1, 10, {
            filter: q ? `nom ~ "${q}"` : "",
            requestKey: null,
        });
        return new Response(JSON.stringify(results.items), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err?.response?.message ?? "Erreur" }), { status: 400 });
    }
};
