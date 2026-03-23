import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const { regimeId } = await request.json();

    if (!regimeId) {
        return new Response(JSON.stringify({ error: "regimeId manquant" }), { status: 400 });
    }

    try {
        await locals.pb.collection("users").update(locals.pb.authStore.record.id, {
            regime: regimeId,
        }, { requestKey: null });

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.response?.message ?? "Erreur" }), { status: 400 });
    }
};
