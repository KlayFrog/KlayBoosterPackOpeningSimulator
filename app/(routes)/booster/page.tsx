"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BoosterCard } from "./card";
import { CardType } from "./card.model";

export default function Home() {
 const [allCardsFlipped, setAllCardsFlipped] = useState(false);
 const cards: CardType[] = []; // replace this with your actual cards

 const handleCardFlip = (isFlipped: boolean) => {
   if (cards.every(card => card.isFlipped)) {
     setAllCardsFlipped(true);
   }
 };

 return (
   <main className="w-full h-full flex justify-center items-center">
     <Link href="/booster">
       <a>
         <Image
           src="/images/main.png"
           alt="Main Image"
           width={128}
           height={192}
           className="pixelated"
           draggable={false}
         />
       </a>
     </Link>
     {cards.map(card => (
       <BoosterCard
         key={card.id}
         card={card}
         onFlip={handleCardFlip}
       />
     ))}
     <button disabled={!allCardsFlipped}>Click me</button>
   </main>
 );
}

type BoosterState = {
  cards: (CardType & { key: string })[];
  oneCardFlipped: boolean;
};

type BoosterAction = { type: "flipCard" } | { type: "openNewPack" };

function reducer(state: BoosterState, action: BoosterAction): BoosterState {
  switch (action.type) {
    case "flipCard":
      return { ...state, oneCardFlipped: true };
    case "openNewPack":
      return {
        ...state,
        cards: getRandomBooster().map((card) => ({ ...card, key: uuidv4() })),
        oneCardFlipped: false,
      };
    default:
      throw new Error();
  }
}

const initialState: BoosterState = {
  cards: getRandomBooster().map((card) => ({ ...card, key: uuidv4() })),
  oneCardFlipped: false,
};

export default function BoosterIndex() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-3">
      <div className="flex flex-wrap gap-3 max-w-[600px] items-center justify-center">
        {state.cards.map((card) => (
          <BoosterCard
            key={card.key}
            card={card}
            onFlip={() => dispatch({ type: "flipCard" })}
          />
        ))}
      </div>
      <Button
        onClick={() =>
          dispatch({
            type: "openNewPack",
          })
        }
        disabled={!state.oneCardFlipped}
      >
        Open a new pack
      </Button>
    </main>
  );
}
