import type { APIRoute } from "astro";

const VALID_OBJECTIFS = ["prendre de la masse", "perdre du poids", "manger sain", "booster son énergie"];

export const POST: APIRoute = async ({ locals, request, redirect }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response("Non autorisé", { status: 401 });
    }

    const data = await request.formData();
    const objectif = data.get("objectif") as string;

    if (!VALID_OBJECTIFS.includes(objectif)) {
        return new Response("Objectif invalide", { status: 400 });
    }

    await locals.pb.collection("users").update(locals.pb.authStore.record.id, { objectif });

    return redirect("/accueil");
};
