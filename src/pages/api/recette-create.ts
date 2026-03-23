import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const form = await request.formData();

    const ingredients: { alimentId: string; quantite: number; unite: string }[] =
        JSON.parse(form.get("ingredients") as string ?? "[]");
    const etapes: string[] =
        JSON.parse(form.get("etapes") as string ?? "[]");

    const recetteData = new FormData();
    recetteData.set("titre",              form.get("titre") as string);
    recetteData.set("description",        form.get("description") as string);
    recetteData.set("temps_preparation",  form.get("temps_preparation") as string);
    recetteData.set("nb_portions",        form.get("nb_portions") as string);
    recetteData.set("difficulte",         form.get("difficulte") as string);
    recetteData.set("objectif",           form.get("objectif") as string);

    const image = form.get("image") as File | null;
    if (image && image.size > 0) recetteData.set("image", image);

    try {
        const recette = await locals.pb.collection("Recettes").create(recetteData, { requestKey: null });

        for (const ing of ingredients) {
            await locals.pb.collection("Recette_aliments").create({
                recette:  recette.id,
                aliment:  ing.alimentId,
                quantite: ing.quantite,
                unite:    ing.unite,
            }, { requestKey: null });
        }

        for (let i = 0; i < etapes.length; i++) {
            if (!etapes[i].trim()) continue;
            await locals.pb.collection("Etapes").create({
                recette:     recette.id,
                numero:      i + 1,
                description: etapes[i].trim(),
            }, { requestKey: null });
        }

        return new Response(JSON.stringify({ id: recette.id }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.response?.message ?? "Erreur" }), { status: 400 });
    }
};
