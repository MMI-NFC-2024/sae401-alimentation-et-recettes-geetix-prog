import type { APIRoute } from "astro";
import { createAdminPb } from "../../utils/pb";
import { loadAdminAuth } from "../../utils/adminAuth";

export const POST: APIRoute = async ({ request }) => {
    const cookieHeader = request.headers.get("cookie");
    const adminPb = loadAdminAuth(cookieHeader);
    if (!adminPb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const body = await request.json();
    const { titre, message, type, recette, objectif_cible } = body;

    if (!titre || !type) {
        return new Response(JSON.stringify({ error: "Champs manquants" }), { status: 400 });
    }

    const pbAdmin = await createAdminPb();
    const notif = await pbAdmin.collection("Notifications").create({
        titre,
        message: message ?? "",
        type,
        recette: recette ?? "",
        objectif_cible: objectif_cible ?? "",
    });

    return new Response(JSON.stringify(notif), { status: 200 });
};
