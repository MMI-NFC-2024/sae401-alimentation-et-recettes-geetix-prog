import type { APIRoute } from "astro";
import { createAdminPb } from "../../utils/pb";
import { loadAdminAuth } from "../../utils/adminAuth";

const ALLOWED_COLLECTIONS = ["Recettes", "Aliments", "Commentaires"];

export const POST: APIRoute = async ({ request }) => {
    const adminPb = loadAdminAuth(request.headers.get("cookie"));
    if (!adminPb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Accès refusé" }), { status: 403 });
    }

    const { collection, id } = await request.json();

    if (!collection || !id || !ALLOWED_COLLECTIONS.includes(collection)) {
        return new Response(JSON.stringify({ error: "Données invalides" }), { status: 400 });
    }

    const pbAdmin = await createAdminPb();
    await pbAdmin.collection(collection).delete(id, { requestKey: null });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
