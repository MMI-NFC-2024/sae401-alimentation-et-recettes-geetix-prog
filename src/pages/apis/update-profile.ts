import type { APIRoute } from "astro";

const VALID_OBJECTIFS = ["prendre de la masse", "perdre du poids", "manger sain", "booster son énergie"];

export const POST: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const data = await request.formData();
    const prenom = data.get("prenom") as string;
    const nom = data.get("nom") as string;
    const objectif = data.get("objectif") as string;
    const avatar = data.get("avatar") as File | null;
    const oldPassword = data.get("oldPassword") as string;
    const password = data.get("password") as string;
    const passwordConfirm = data.get("passwordConfirm") as string;

    if (!prenom || !nom) {
        return new Response(JSON.stringify({ error: "Prénom et nom sont requis" }), { status: 400 });
    }

    if (objectif && !VALID_OBJECTIFS.includes(objectif)) {
        return new Response(JSON.stringify({ error: "Objectif invalide" }), { status: 400 });
    }

    if (password) {
        if (password.length < 8) {
            return new Response(JSON.stringify({ error: "Le mot de passe doit contenir au moins 8 caractères" }), { status: 400 });
        }
        if (password !== passwordConfirm) {
            return new Response(JSON.stringify({ error: "Les mots de passe ne correspondent pas" }), { status: 400 });
        }
        if (!oldPassword) {
            return new Response(JSON.stringify({ error: "L'ancien mot de passe est requis" }), { status: 400 });
        }
    }

    try {
        const userId = locals.pb.authStore.record.id;
        const updateData = new FormData();

        updateData.append("prenom", prenom);
        updateData.append("nom", nom);
        if (objectif) updateData.append("objectif", objectif);
        if (avatar && avatar.size > 0) updateData.append("avatar", avatar);
        if (password) {
            updateData.append("oldPassword", oldPassword);
            updateData.append("password", password);
            updateData.append("passwordConfirm", passwordConfirm);
        }

        await locals.pb.collection("users").update(userId, updateData);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err: any) {
        const msg = err?.response?.message ?? "Une erreur est survenue";
        return new Response(JSON.stringify({ error: msg }), { status: 400 });
    }
};
