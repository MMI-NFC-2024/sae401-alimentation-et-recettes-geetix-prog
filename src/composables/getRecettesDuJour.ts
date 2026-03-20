import type PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";

export async function getRecettesDuJour(pb: PocketBase): Promise<RecordModel[]> {
    const recettes = await pb.collection("Recettes").getFullList();

    if (recettes.length === 0) return [];

    const now = new Date();
    const debut = new Date(now.getFullYear(), 0, 0);
    const jourDansAnnee = Math.floor((now.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24));

    const total = recettes.length;
    return [0, 1, 2].map(i => recettes[(jourDansAnnee + i) % total]);
}
