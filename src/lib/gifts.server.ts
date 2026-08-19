export type GiftPrize = {
  tag: string;
  title: string;
  text: string;
  imageKey: "horizon" | "signature" | "support250" | "support170";
};

const PRIZES: GiftPrize[] = [
  {
    tag: "Mobilité",
    title: "Tesla 2026 · Horizon",
    text: "Une mobilité électrique pensée pour demain, sobre et lumineuse.",
    imageKey: "horizon",
  },
  {
    tag: "Mobilité",
    title: "Tesla 2026 · Signature",
    text: "Une autre vision de la conduite électrique, plus affirmée.",
    imageKey: "signature",
  },
  {
    tag: "Soutien",
    title: "250 000 $",
    text: "Un soutien financier majeur pour ouvrir un nouveau chapitre.",
    imageKey: "support250",
  },
  {
    tag: "Soutien",
    title: "170 000 $",
    text: "Une contribution pensée pour faire avancer vos projets.",
    imageKey: "support170",
  },
];

export function drawPrize(): GiftPrize {
  const index = Math.floor(Math.random() * PRIZES.length);
  return PRIZES[index]!;
}
