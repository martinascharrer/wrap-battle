import { useState } from 'react'
import {MemoryGame} from './MemoryGame';


export const CreateMemoryGame = () => {
    const [user, setUser] = useState('');
    const cardCount = 8;

    return (
        <div className="create-memory-game">
            <MemoryGame/>
        </div>
    );
}

