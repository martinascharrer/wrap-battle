import { useState } from 'react'
import {MemoryCard} from './MemoryCard';


export const MemoryGame = () => {
    const [user, setUser] = useState('');
    let cardCount = 12;
    const memoryCards = [];
    let hi = "hi";
    const food = ["burrito", "nacho", "tortilla", "enchillada", "chimichanga", "taco"]

    for(let i = 0; i < cardCount; i++ ){
        let selection = i % 6;
        memoryCards.push(<MemoryCard content={food[selection]}/>);
    }

    return (
        <div className="memory-game">
            {memoryCards}
        </div>
    );
}


export default MemoryGame;
