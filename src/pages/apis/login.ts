import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request }) => {
    const data = await request.json();
    const { email, password } = data;

    if (!email || !password) {
        return new Response(JSON.stringify({ error: "Email et mot de passe requis" }), {
            status: 400,
        });
    }

    try {
        await locals.pb.collection("users").authWithPassword(email, password);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                "set-cookie": locals.pb.authStore.exportToCookie(),
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: "Email ou mot de passe incorrect" }), {
            status: 401,
        });
    }
};
