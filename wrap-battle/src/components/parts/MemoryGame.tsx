import { useState } from 'react';
import { MemoryCardType } from '../../types/memoryCardType';
import { gamePlayer } from '../../types/gamePlayer';
import {MemoryCardList} from './MemoryCardList';
import { resetValues, updateMemoryCards } from '../../services/memorylogic';

type memoryGameProps = {
    playerCount: number;
}

function shuffle(food: string[]) {
    let foodCopy = food.concat(food);
    const cardCount = foodCopy.length;
    const memoryCards = [];
    for(let i = 0; i < cardCount; i++ ){
        let selectedIndex = Math.floor(Math.random() * Math.floor(foodCopy.length-1));
        let selection = selectedIndex;
        const newMemoryCard : MemoryCardType = {id : i, content:foodCopy[selection], state:0};
        memoryCards.push(newMemoryCard);
        foodCopy.splice(selectedIndex,1);
    }
    return memoryCards;
}

function getDefaultPlayer(props:any){
    const gamePlayers: gamePlayer[] = [];
    for(let i = 0; i < props.playerCount; i++){
        let onturn = false;
        if(i===0) onturn = true;
        const newPlayer: gamePlayer = { id: i, name : 'Player'+i, nachos : 0, onTurn: onturn };
        gamePlayers.push(newPlayer);
    }
    return gamePlayers;
}

//Warum gehts nur mit diesem shit???
type playerProps = {
    player: gamePlayer
}
function DisplayPlayers( {player} : playerProps){
    if(player.onTurn === true){
        return <p>{player.name} {player.nachos} onTurn</p>;
    } else {
        return <p>{player.name} {player.nachos}</p>;
    }
}

export const MemoryGame = (playerCount: memoryGameProps) => {

    const food = ['burrito', 'nacho', 'tortilla', 'enchillada', 'chimichanga', 'taco'];
    const [memoryCards,setMemoryCards] = useState(shuffle(food));
    const [players, setPlayers] = useState(getDefaultPlayer(playerCount));

    const onClick = (index : number)=> {
        // warum muss man das so machen??
        // setMemoryCards(createNewStates(memoryCards, index)); geht nicht warum ?? :(
        let updatedValues = updateMemoryCards(memoryCards, players, index);
        let newMemoryCards = [...memoryCards];
        let updatedCards = updatedValues.memoryCards;
        for (let i = 0; i < memoryCards.length; i++){
                newMemoryCards[i].state = updatedCards[i].state;
        }
        setMemoryCards(newMemoryCards);
        setPlayers(updatedValues.gamePlayers);
        setTimeout(() => {
            setMemoryCards(resetValues(memoryCards));
        }, 2500);
    };


    return (
        <div className="memory-game">
            <MemoryCardList memoryCards={memoryCards} onClick={onClick} />
            {players.map((player)=>
                <DisplayPlayers player={player}/>
            )}
        </div>
        
    );
};


export default MemoryGame;
