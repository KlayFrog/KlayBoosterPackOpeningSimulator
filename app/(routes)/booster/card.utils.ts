import { ALL_CARDS } from "./card.data";
import { CardCategoryType, CardType } from "./card.model";

const getRandomCards = ({
 cards,
 count,
}: {
 cards: CardType[];
 count: number;
}) => {
 for (let i = cards.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [cards[i], cards[j]] = [cards[j], cards[i]];
 }
 return cards.slice(0, count);
};

const BOOSTER_STRUCTURE: [CardCategoryType, number][] = [
  ["common", 5],
  ["special", 3],
  ["energy", 1],
];

export const getRandomBooster = () => {
  const cards = BOOSTER_STRUCTURE.flatMap(([category, count]) =>
    getRandomCards({
      cards: ALL_CARDS.filter((card) => card.category === category),
      count,
    })
  );

  return cards;
};
