import type { APIRoute } from "astro";

export const POST: APIRoute = async () => {
    return new Response(null, {
        status: 302,
        headers: {
            "Location": "/admin/login",
            "Set-Cookie": "pb_admin_auth=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict",
        },
    });
};
