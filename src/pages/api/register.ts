import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request }) => {
    const data = await request.json();
    const { email, username, password, passwordConfirm } = data;

    if (!email || !username || !password || !passwordConfirm) {
        return new Response(JSON.stringify({ error: "Tous les champs sont requis" }), {
            status: 400,
        });
    }

    if (password !== passwordConfirm) {
        return new Response(JSON.stringify({ error: "Les mots de passe ne correspondent pas" }), {
            status: 400,
        });
    }

    try {
        await locals.pb.collection("users").create({ email, username, password, passwordConfirm });
        await locals.pb.collection("users").authWithPassword(email, password);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                "set-cookie": locals.pb.authStore.exportToCookie(),
            },
        });
    } catch (err: any) {
        const msg = err?.response?.message ?? "Une erreur est survenue";
        return new Response(JSON.stringify({ error: msg }), { status: 400 });
    }
};
