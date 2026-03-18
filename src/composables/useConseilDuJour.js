/**
 * Récupère le conseil du jour filtré par l'objectif de l'utilisateur.
 * Le conseil retourné est déterminé par : (numéro du jour dans l'année) % (nombre de conseils).
 *
 * @param {import('pocketbase').default} pb - Instance PocketBase
 * @param {string} objectif - Objectif de l'utilisateur connecté
 * @returns {Promise<string|null>} Le texte du conseil du jour, ou null si aucun conseil trouvé
 */
export async function getConseilDuJour(pb, objectif) {
    if (!objectif) return null;

    const conseils = await pb.collection("Conseil").getFullList({
        filter: `objectif = "${objectif}"`,
    });

    if (conseils.length === 0) return null;

    const now = new Date();
    const debut = new Date(now.getFullYear(), 0, 0);
    const diff = now - debut;
    const jourDansAnnee = Math.floor(diff / (1000 * 60 * 60 * 24));

    return conseils[jourDansAnnee % conseils.length].conseil;
}
