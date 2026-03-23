import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, request }) => {
    if (!locals.pb.authStore.isValid) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const url = new URL(request.url);
    const today = url.searchParams.get("today") ?? new Date().toISOString().split("T")[0];

    const entries = await locals.pb.collection("Journal").getFullList({
        filter: `user = "${locals.pb.authStore.record.id}" && date >= "${today} 00:00:00" && date <= "${today} 23:59:59"`,
        expand: "aliment",
        sort: "-date",
        requestKey: null,
    });

    const totaux = entries.reduce((acc: any, e: any) => {
        const a = e.expand?.aliment;
        if (!a) return acc;
        const q = e.quantite / 100;
        acc.calories  += a.calories  * q;
        acc.proteines += a.proteines * q;
        acc.glucides  += a.glucides  * q;
        acc.lipides   += a.lipides   * q;
        return acc;
    }, { calories: 0, proteines: 0, glucides: 0, lipides: 0 });

    Object.keys(totaux).forEach(k => { totaux[k] = Math.round(totaux[k]); });

    return new Response(JSON.stringify({ totaux }), { status: 200 });
};
