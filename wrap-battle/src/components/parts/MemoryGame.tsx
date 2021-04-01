import { useState } from 'react'
import {MemoryCard} from './MemoryCard';


function shuffle(food: string[]) {
    let foodCopy = food.concat(food);
    const cardCount = foodCopy.length;
    const memoryCards = [];
    for(let i = 0; i < cardCount; i++ ){
        let selectedIndex = Math.floor(Math.random() * Math.floor(foodCopy.length-1));
        let selection = selectedIndex;
        memoryCards.push(<MemoryCard content={foodCopy[selection]}/>);
        foodCopy.splice(selectedIndex,1);
    }
    return memoryCards;
}


export const MemoryGame = () => {
    const food = ["burrito", "nacho", "tortilla", "enchillada", "chimichanga", "taco"]
    const memoryCards = shuffle(food);

    return (
        <div className="memory-game">
            {memoryCards}
        </div>
    );
}


export default MemoryGame;
