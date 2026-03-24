import type { APIRoute } from "astro";
import { createAdminPb } from "../../utils/pb";
import { loadAdminAuth } from "../../utils/adminAuth";

export const GET: APIRoute = async ({ request, url }) => {
    const adminPb = loadAdminAuth(request.headers.get("cookie"));
    if (!adminPb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const recetteId = url.searchParams.get("id");
    if (!recetteId) {
        return new Response(JSON.stringify({ error: "ID manquant" }), { status: 400 });
    }

    try {
        const pbAdmin = await createAdminPb();
        const [notes, commentaires] = await Promise.all([
            pbAdmin.collection("Notes").getFullList({
                filter: `recette = "${recetteId}"`,
                expand: "user",
                sort: "-created",
                requestKey: null,
            }),
            pbAdmin.collection("Commentaires").getFullList({
                filter: `recette = "${recetteId}"`,
                expand: "user",
                sort: "-created",
                requestKey: null,
            }),
        ]);
        return new Response(JSON.stringify({ notes, commentaires }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.message ?? "Erreur serveur" }), { status: 500 });
    }
};
