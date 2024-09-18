import { CardType } from "./card.model";

// Instead of hard-coding the card data in the component, we can do a loop from 1 to 10
// and generate the image path from the loop index.
const ENERGY_CARDS: CardType[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  category: "energy",
}));
const SPECIAL_CARDS: CardType[] = Array.from({ length: 51 }, (_, i) => ({
  category: "special",
  id: i + 1,
}));
const COMMON_CARDS: CardType[] = Array.from({ length: 53 }, (_, i) => ({
  category: "common",
  id: i + 1,
}));

export const ALL_CARDS: CardType[] = [
  ...ENERGY_CARDS,
  ...SPECIAL_CARDS,
  ...COMMON_CARDS,
];
