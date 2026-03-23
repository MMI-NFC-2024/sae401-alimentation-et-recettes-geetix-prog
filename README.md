# Informations

- Prenom : Mathis
- Nom : Guellati

# Lien du site

- https://sae401dev.mathis-guellati.fr

# Utilisation de l'IA dans le projet

Concernant l'IA, je m'en suis servi pour des pages complexes, notamment pour la creation de la calculatrice nutritionnelle dans la page `/src/pages/recettes/[id].astro`.

Cette fonctionnalite implique des calculs dynamiques de macronutriments (calories, proteines, glucides, lipides) en fonction du nombre de portions, ce qui necessitait une logique JavaScript que je ne maitrisais pas encore completement.

Je m'en suis aussi servi pour l'indentation, car celle native de mon VS Code ne fonctionnait pas correctement, ce qui rendait le code difficile a lire et a maintenir.

Egalement pour le systeme de notation des recettes, que je ne savais pas vraiment comment aborder. L'IA m'a aide a mettre en place :

- le calcul de la moyenne des notes par recette ;
- le stockage par utilisateur pour eviter les doublons ;
- la mise a jour en temps reel de la note affichee sans rechargement de page.

Pour certaines routes API comme la gestion des commentaires (`/src/pages/apis/comment-add.ts`, `comment-delete.ts`) et l'adoption d'un regime (`adopt-regime.ts`), l'IA m'a aide a structurer les reponses et a gerer les cas d'erreur.

Je me suis servis de l'IA pour mettre du contenu en masse dans mon pocketbase et pour quelque icons.

Enfin, je m'en suis servi pour la structure de certains codes et pour le SEO.