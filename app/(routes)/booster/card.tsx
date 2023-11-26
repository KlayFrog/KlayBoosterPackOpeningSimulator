"use client";

import Image from "next/image";
import { CardType, FlippableCardType } from "./card.model";
import { useState } from "react";
import styles from "./card.module.css";
import { cn } from "../utils";
import { on } from "events";

export type BoosterCardProps = {
  card: FlippableCardType;
  onFlip?: () => void;
};

export const BoosterCard = ({ card, onFlip }: BoosterCardProps) => {
  const displayedSide = card.flipped ? "front" : "back";

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
        onFlip?.();
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
