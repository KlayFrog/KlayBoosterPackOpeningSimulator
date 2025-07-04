import { CardType } from "./card.model";

// Instead of hard-coding the card data in the component, we can do a loop from 1 to 10
// and generate the image path from the loop index.
const ENERGY_CARDS: CardType[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  category: "energy",
}));
const COMMON_CARDS: CardType[] = Array.from({ length: 57 }, (_, i) => ({
  category: "common",
  id: i + 1,
}));
const COMMONSHINY_CARDS: CardType[] = Array.from({ length: 10 }, (_, i) => ({
  category: "commonshiny",
  id: i + 1,
}));
const LOWRES_CARDS: CardType[] = Array.from({ length: 50}, (_, i) => ({
  category: "lowres",
  id: i + 1,
}));
const LOWRESNAGABA_CARDS: CardType[] = Array.from({ length: 10 }, (_, i) => ({
  category: "lowresnagaba",
  id: i + 1,
}));
const LOWRESNAGABASHINY_CARDS: CardType[] = Array.from({ length: 10 }, (_, i) => ({
  category: "lowresnagabashiny",
  id: i + 1,
}));
const LOWRESPROF_CARDS: CardType[] = Array.from({ length: 7 }, (_, i) => ({
  category: "lowresprof",
  id: i + 1,
}));
const LOWRESSHINY_CARDS: CardType[] = Array.from({ length: 10 }, (_, i) => ({
  category: "lowresshiny",
  id: i + 1,
}));

export const ALL_CARDS: CardType[] = [
  ...ENERGY_CARDS,
  ...COMMON_CARDS,
  ...COMMONSHINY_CARDS,
  ...LOWRES_CARDS,
  ...LOWRESNAGABA_CARDS,
  ...LOWRESNAGABASHINY_CARDS,
  ...LOWRESPROF_CARDS,
  ...LOWRESSHINY_CARDS,
];
