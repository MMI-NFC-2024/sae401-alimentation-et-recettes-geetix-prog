import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const data = await request.json();
    const { alimentId, quantite } = data;

    if (!alimentId || !quantite || quantite < 1) {
        return new Response(JSON.stringify({ error: "Données invalides" }), { status: 400 });
    }

    try {
        const entry = await locals.pb.collection("Journal").create({
            user: locals.pb.authStore.record.id,
            aliment: alimentId,
            quantite: Number(quantite),
        });

        const populated = await locals.pb.collection("Journal").getOne(entry.id, {
            expand: "aliment",
            requestKey: null,
        });

        return new Response(JSON.stringify(populated), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err?.response?.message ?? "Erreur" }), { status: 400 });
    }
};
