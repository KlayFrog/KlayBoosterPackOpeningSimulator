export type CardCategoryType = "energy" | "common" | "commonshiny" | "lowres" | "lowresnagaba" | "lowresnagabashiny" | "lowresprof" | "lowresshiny" | "commonshiny_or_common" | "lowres_special";

export type CardType = {
  category: CardCategoryType;
  id: number;
};

export type FlippableCardType = CardType & {
  flipped: boolean;
};
