"use client";

import { Button } from "@/app/_components/button";
import { BoosterCard } from "./card";
import { getRandomBooster } from "./card.utils";
import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardType } from "./card.model";

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

 const handleCardFlip = (isFlipped: boolean) => {
   if (isFlipped) {
     dispatch({ type: "flipCard" });
   }
 };

 return (
   <main className="w-full h-full flex flex-col justify-center items-center gap-3">
     <div className="flex flex-wrap gap-3 max-w-[600px] items-center justify-center">
       {state.cards.map((card) => (
         <BoosterCard
           key={card.key}
           card={card}
           onFlip={handleCardFlip}
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
