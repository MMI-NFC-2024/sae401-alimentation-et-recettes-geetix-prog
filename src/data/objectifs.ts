import brasG from "../assets/icons/brasIconG.svg?url";
import brasD from "../assets/icons/brasIconD.svg?url";
import iconFlash from "../assets/icons/iconFlash.svg?url";
import iconFire from "../assets/icons/iconFire.svg?url";
import iconGrass from "../assets/icons/iconGrass.svg?url";

export type Objectif = {
    value: string;
    iconLeft: string;
    iconRight: string;
    accroche: string;
};

export const objectifs: Objectif[] = [
    {
        value: "prendre de la masse",
        iconLeft: brasG,
        iconRight: brasD,
        accroche: "Surplus protéiné, recettes riches et énergétiques.",
    },
    {
        value: "perdre du poids",
        iconLeft: iconFire,
        iconRight: iconFire,
        accroche: "Déficit calorique, recettes légères et rassasiantes.",
    },
    {
        value: "manger sain",
        iconLeft: iconGrass,
        iconRight: iconGrass,
        accroche: "Équilibre nutritionnel, produits frais et naturels.",
    },
    {
        value: "booster son énergie",
        iconLeft: iconFlash,
        iconRight: iconFlash,
        accroche: "Vitalité, récupération et endurance au quotidien.",
    },
];
