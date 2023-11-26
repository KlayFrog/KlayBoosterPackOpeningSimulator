import { ALL_CARDS } from "./card.data";
import { CardCategoryType, CardType } from "./card.model";

const getRandomCards = ({
  cards,
  count,
}: {
  cards: CardType[];
  count: number;
}) => {
  const shuffled = cards.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const BOOSTER_STRUCTURE: [CardCategoryType, number][] = [
  ["common", 5],
  ["special", 1],
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
