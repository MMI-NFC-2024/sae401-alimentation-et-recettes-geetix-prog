import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
        return new Response(JSON.stringify({ error: "ID manquant" }), { status: 400 });
    }

    try {
        await locals.pb.collection("Journal").delete(id);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err?.response?.message ?? "Erreur" }), { status: 400 });
    }
};
