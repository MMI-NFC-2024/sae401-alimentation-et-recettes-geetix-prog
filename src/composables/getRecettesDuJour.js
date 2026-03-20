export async function getRecettesDuJour(pb) {
    const recettes = await pb.collection("Recettes").getFullList();

    if (recettes.length === 0) return [];

    const now = new Date();
    const debut = new Date(now.getFullYear(), 0, 0);
    const jourDansAnnee = Math.floor((now - debut) / (1000 * 60 * 60 * 24));

    const total = recettes.length;
    return [0, 1, 2].map(i => recettes[(jourDansAnnee + i) % total]);
}
