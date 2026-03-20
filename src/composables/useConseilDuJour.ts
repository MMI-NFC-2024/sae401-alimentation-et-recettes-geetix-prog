import type PocketBase from "pocketbase";

export async function getConseilDuJour(pb: PocketBase, objectif: string | undefined): Promise<string | null> {
    if (!objectif) return null;

    const conseils = await pb.collection("Conseil").getFullList({
        filter: `objectif = "${objectif}"`,
    });

    if (conseils.length === 0) return null;

    const now = new Date();
    const debut = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - debut.getTime();
    const jourDansAnnee = Math.floor(diff / (1000 * 60 * 60 * 24));

    return (conseils[jourDansAnnee % conseils.length] as any).conseil;
}
