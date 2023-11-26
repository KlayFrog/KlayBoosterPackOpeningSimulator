"use client";

import Image from "next/image";
import { CardType } from "./card.model";
import { useState } from "react";
import styles from "./card.module.css";
import { cn } from "../utils";
import { on } from "events";

export type BoosterCardProps = {
  card: CardType;
  onFlip?: () => void;
};

export const BoosterCard = ({ card, onFlip }: BoosterCardProps) => {
  const [displayedSide, setDisplayedSide] = useState<"front" | "back">("back");
  const [allCardsFlipped, setAllCardsFlipped] = useState(false);
 
  return (
    <div
      className={cn(
        "w-[128px] h-[96px] relative transition duration-500",
        styles.cardContainer,
        {
          [styles.cardShowBack]: displayedSide === "back",
        }
      )}
      onClick={() => {
        if (!allCardsFlipped) {
          setDisplayedSide("front");
          onFlip?.();
        }
      }}
    >
      <Image
        src={getCardFrontImageUrl(card)}
        alt={`Card with id ${card.id}`}
        width={128}
        height={96}
        className={cn("pixelated absolute inset-0", styles.cardFront)}
      />
      <Image
        src={getCardBackImageUrl(card)}
        alt={`Card with id ${card.id}`}
        width={128}
        height={96}
        className={cn("pixelated absolute inset-0", styles.cardBack)}
      />
      <button onClick={() => setAllCardsFlipped(true)} disabled={allCardsFlipped}>
        Flip All Cards
      </button>
    </div>
  );
 };

const getCardImageDirectory = (card: CardType) => {
  switch (card.category) {
    case "common":
      return `/images/cards/common`;
    case "energy":
      return `/images/cards/energy`;
    case "special":
    default:
      return `/images/cards/special`;
  }
};

const getCardFrontImageUrl = (card: CardType) =>
  `${getCardImageDirectory(card)}/${card.id}.png`;

const getCardBackImageUrl = (card: CardType) =>
  `${getCardImageDirectory(card)}/back.png`;
