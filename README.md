# Informations

- Prenom : Mathis
- Nom : Guellati

# Lien du site

- https://sae401dev.mathis-guellati.fr

---

# NŪRA — Comment monétiser ce projet ?

NŪRA est une plateforme de nutrition personnalisée avec journal alimentaire, recettes, régimes, conseils et mise en relation avec des professionnels de santé. Voici les leviers de monétisation directement exploitables avec ce qui est déjà en place.

## 1. Liens d'affiliation (déjà en place — à activer)

La page `/accompagnement` renvoie vers 6 partenaires professionnels :
- **Livi** (diététicien en ligne) — programme d'affiliation disponible
- **Coach-Sportif.fr** — commission sur mise en relation
- **LineCoaching** (programme 12 semaines) — affiliation sur vente de programme
- **MapSanté / OMNES / Medecindusport** — potentiel de partenariat rémunéré

**Action :** Rejoindre les programmes d'affiliation de chaque plateforme, remplacer les liens par des liens trackés. Revenus estimés : 10–30 % sur chaque conversion.

## 2. Contenu sponsorisé ciblé

Le site collecte déjà l'objectif de chaque utilisateur (prise de masse, perte de poids, manger sain, énergie). C'est une donnée publicitaire précieuse.

**Action :** Intégrer des encarts sponsorisés dans les pages recettes, journal et régimes, ciblés selon l'objectif de l'utilisateur. Marques cibles : compléments alimentaires, équipements sportifs, applications de coaching.

## 3. Modèle Freemium (abonnement premium)

Fonctionnalités déjà en place qui pourraient passer en accès payant :

| Gratuit | Premium (~4,99 €/mois) |
|---|---|
| Accès aux recettes de base | Toutes les recettes + filtre avancé |
| Journal alimentaire limité | Journal illimité + export PDF |
| 1 régime disponible | Tous les régimes + suivi personnalisé |
| Conseils généraux | Conseils personnalisés quotidiens |
| — | Accès prioritaire aux professionnels |

**Action :** Ajouter Stripe pour la gestion des abonnements, créer un champ `isPremium` dans PocketBase, conditionner certains contenus selon ce statut.

## 4. Partenariats B2B avec des nutritionnistes

NŪRA peut être proposé en marque blanche à des diététiciens indépendants qui cherchent un outil pour suivre leurs patients à distance.

**Action :** Créer un espace "professionnel" dans l'admin existant, permettre à un praticien d'inviter ses patients et de consulter leur journal. Tarif : abonnement mensuel par praticien (ex. 29 €/mois pour 10 patients).

## 5. Vente de programmes nutritionnels

Le système de régimes est déjà construit. Il suffit de créer des programmes premium (avec recettes exclusives, menus semaine, liste de courses) vendus à l'unité.

**Action :** Ajouter un système d'achat à l'unité (5–15 € par programme) via Stripe, stocker le statut d'achat dans PocketBase.

---

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
