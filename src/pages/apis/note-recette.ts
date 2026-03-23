import type { APIRoute } from "astro";
import { createAdminPb } from "../../utils/pb";

export const POST: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const { recetteId, valeur } = await request.json();

    if (!recetteId || !valeur || valeur < 1 || valeur > 5) {
        return new Response(JSON.stringify({ error: "Données invalides" }), { status: 400 });
    }

    const userId = locals.pb.authStore.record.id;

    try {
        const existing = await locals.pb.collection("Notes").getFirstListItem(
            `recette = "${recetteId}" && user = "${userId}"`,
            { requestKey: null }
        ).catch(() => null);

        if (existing) {
            await locals.pb.collection("Notes").update(existing.id, { valeur }, { requestKey: null });
        } else {
            await locals.pb.collection("Notes").create({ recette: recetteId, user: userId, valeur }, { requestKey: null });
        }

        const pbAdmin = await createAdminPb();

        const toutes = await pbAdmin.collection("Notes").getFullList({
            filter: `recette = "${recetteId}"`,
            requestKey: null,
        });

        const moyenne = toutes.length
            ? Math.round((toutes.reduce((s: number, n: any) => s + n.valeur, 0) / toutes.length) * 10) / 10
            : 0;

        await pbAdmin.collection("Recettes").update(recetteId, { note_moyenne: moyenne }, { requestKey: null });

        return new Response(JSON.stringify({ moyenne, total: toutes.length }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.response?.message ?? "Erreur" }), { status: 400 });
    }
};
