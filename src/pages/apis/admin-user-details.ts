import type { APIRoute } from "astro";
import { createAdminPb } from "../../utils/pb";
import { loadAdminAuth } from "../../utils/adminAuth";

export const GET: APIRoute = async ({ request, url }) => {
    const adminPb = loadAdminAuth(request.headers.get("cookie"));
    if (!adminPb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const userId = url.searchParams.get("id");
    if (!userId) {
        return new Response(JSON.stringify({ error: "ID manquant" }), { status: 400 });
    }

    const pbAdmin = await createAdminPb();
    const [commentaires, notes] = await Promise.all([
        pbAdmin.collection("Commentaires").getFullList({
            filter: `user = "${userId}"`,
            expand: "recette",
            sort: "-created",
            requestKey: null,
        }),
        pbAdmin.collection("Notes").getFullList({
            filter: `user = "${userId}"`,
            expand: "recette",
            sort: "-created",
            requestKey: null,
        }),
    ]);

    return new Response(JSON.stringify({ commentaires, notes }), { status: 200 });
};
