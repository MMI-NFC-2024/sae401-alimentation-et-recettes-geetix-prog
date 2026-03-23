import type { APIRoute } from "astro";
import { createAdminPb } from "../../utils/pb";

const ALLOWED_COLLECTIONS = ["Recettes", "Aliments", "Commentaires"];

export const POST: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    if (locals.pb.authStore.record?.email !== import.meta.env.PB_EMAIL) {
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
