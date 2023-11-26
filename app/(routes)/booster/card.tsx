"use client";

import Image from "next/image";
import { CardType } from "./card.model";
import { useState } from "react";
import styles from "./card.module.css";
import { cn } from "../utils";
import { on } from "events";

export type BoosterCardProps = {
 card: CardType;
 onFlip: (cardKey: string, isFlipped: boolean) => void;
};

export const BoosterCard = ({ card, onFlip }: BoosterCardProps) => {
 const [displayedSide, setDisplayedSide] = useState<"front" | "back">("back");
 const [isFlipped, setIsFlipped] = useState(false);

 const handleFlip = () => {
  setDisplayedSide("front");
  setIsFlipped(true);
  onFlip(card.key, isFlipped);
 };

 return (
  <div
    className={cn(
      "w-[128px] h-[96px] relative transition duration-500",
      styles.cardContainer,
      {
        [styles.cardShowBack]: displayedSide === "back",
      }
    )}
    onClick={handleFlip}
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
