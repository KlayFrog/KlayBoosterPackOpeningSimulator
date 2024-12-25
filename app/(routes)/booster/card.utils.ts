import { ALL_CARDS } from "./card.data";
import { CardCategoryType, CardType } from "./card.model";

/**
 * Function to shuffle and pick random cards.
 * @param {CardType[]} cards - The pool of cards to choose from.
 * @param {number} count - Number of cards to pick.
 * @returns {CardType[]} Randomly selected cards.
 */
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

// New booster structure definition
const BOOSTER_STRUCTURE: [CardCategoryType, number][] = [
  ["common", 3],
  ["commonshiny_or_common", 1], // 20% chance for commonshiny
  ["lowres", 2],
  ["lowres_special", 1], // Conditional: lowresprof, lowresshiny, lowresnagaba, lowresnagabashiny
  ["energy", 1],
];

/**
 * Helper to pick a card based on weighted probabilities.
 * @param {Array<[CardCategoryType, number]>} categories - Array of categories with weights.
 * @returns {CardCategoryType} Chosen category.
 */
const pickWeightedCategory = (
  categories: Array<[CardCategoryType, number]>
): CardCategoryType => {
  const totalWeight = categories.reduce((sum, [, weight]) => sum + weight, 0);
  const random = Math.random() * totalWeight;
  let cumulativeWeight = 0;

  for (const [category, weight] of categories) {
    cumulativeWeight += weight;
    if (random <= cumulativeWeight) {
      return category;
    }
  }

  return categories[categories.length - 1][0]; // Fallback to last category
};

export const getRandomBooster = () => {
  const cards = BOOSTER_STRUCTURE.flatMap(([category, count]) => {
    if (category === "commonshiny_or_common") {
      // 20% chance for commonshiny, 80% chance for common
      const selectedCategory = pickWeightedCategory([
        ["commonshiny", 20],
        ["common", 80],
      ]);
      return getRandomCards({
        cards: ALL_CARDS.filter((card) => card.category === selectedCategory),
        count,
      });
    }

    if (category === "lowres_special") {
      // Conditional probabilities for lowres special cards
      const selectedCategory = pickWeightedCategory([
        ["lowresprof", 50],
        ["lowresshiny", 30],
        ["lowresnagaba", 15],
        ["lowresnagabashiny", 5],
      ]);
      return getRandomCards({
        cards: ALL_CARDS.filter((card) => card.category === selectedCategory),
        count,
      });
    }

    // Default case: fetch cards directly based on category
    return getRandomCards({
      cards: ALL_CARDS.filter((card) => card.category === category),
      count,
    });
  });

  return cards;
};