import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const { recetteId, contenu } = await request.json();

    if (!recetteId || !contenu?.trim()) {
        return new Response(JSON.stringify({ error: "Données manquantes" }), { status: 400 });
    }

    try {
        const comment = await locals.pb.collection("Commentaires").create({
            recette: recetteId,
            user: locals.pb.authStore.record.id,
            contenu: contenu.trim(),
        }, { requestKey: null });

        const full = await locals.pb.collection("Commentaires").getOne(comment.id, {
            expand: "user",
            requestKey: null,
        });

        return new Response(JSON.stringify(full), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.response?.message ?? "Erreur" }), { status: 400 });
    }
};
