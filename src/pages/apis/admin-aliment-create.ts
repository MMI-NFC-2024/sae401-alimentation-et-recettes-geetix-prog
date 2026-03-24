import type { APIRoute } from "astro";
import { createAdminPb } from "../../utils/pb";
import { loadAdminAuth } from "../../utils/adminAuth";

export const POST: APIRoute = async ({ request }) => {
    const adminPb = loadAdminAuth(request.headers.get("cookie"));
    if (!adminPb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const formData = await request.formData();
    const nom = formData.get("nom")?.toString().trim();
    const categorie = formData.get("categorie")?.toString().trim();
    const calories = formData.get("calories")?.toString();
    const proteines = formData.get("proteines")?.toString();
    const glucides = formData.get("glucides")?.toString();
    const lipides = formData.get("lipides")?.toString();

    if (!nom || !categorie || !calories || !proteines || !glucides || !lipides) {
        return new Response(JSON.stringify({ error: "Tous les champs sont requis" }), { status: 400 });
    }

    try {
        const pbAdmin = await createAdminPb();
        const data = new FormData();
        data.append("nom", nom);
        data.append("categorie", categorie);
        data.append("calories", calories);
        data.append("proteines", proteines);
        data.append("glucides", glucides);
        data.append("lipides", lipides);

        const image = formData.get("image") as File | null;
        if (image && image.size > 0) data.append("image", image);

        const aliment = await pbAdmin.collection("Aliments").create(data, { requestKey: null });
        return new Response(JSON.stringify(aliment), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.message ?? "Erreur serveur" }), { status: 500 });
    }
};
