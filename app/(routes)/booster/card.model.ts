export type CardCategoryType = "energy" | "common" | "special";

export type CardType = {
  category: CardCategoryType;
  id: number;
};

export type FlippableCardType = CardType & {
  flipped: boolean;
};
