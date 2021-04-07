import { useState } from 'react';
import { MemoryCardType } from '../../types/memoryCardType';
import { GamePlayer } from '../../types/gamePlayer';
import {MemoryCardList} from './MemoryCardList';
import { resetValues, updateMemoryCards } from '../../services/memorylogic';
import imageTaco from '../../assets/images/food/taco.jpg';
import imageBurrito from '../../assets/images/food/burrito.jpg';
import imageNacho from '../../assets/images/food/nacho.jpg';
import imageEnchilada from '../../assets/images/food/enchilada.jpg';
import imageChimichanga from '../../assets/images/food/chimichanga.jpg';
import imageTortilla from '../../assets/images/food/tortilla.jpg';

// muss man das immer machen?
type memoryGameProps = {
    playerCount: number;
}

function createRandomMemoryLayout(food: string[], images: string[]) {
    let foodCopy = food.concat(food);
    let empty = [];
    for(let i = 0 ; i <images.length; i++ ){
        empty.push('no');
    }
    let imageCopy = images.concat(empty);
    const cardCount = foodCopy.length;
    const memoryCards = [];
    for(let i = 0; i < cardCount; i++ ){
        let selectedIndex = Math.floor(Math.random() * Math.floor(foodCopy.length-1));
        const newMemoryCard : MemoryCardType = {id : i, content:foodCopy[selectedIndex], image:imageCopy[selectedIndex], state:0};
        memoryCards.push(newMemoryCard);
        foodCopy.splice(selectedIndex,1);
        imageCopy.splice(selectedIndex,1);
    }
    return memoryCards;
}

function getDefaultPlayers(props:any){
    const gamePlayers: GamePlayer[] = [];
    for(let i = 0; i < props.playerCount; i++){
        let onturn = false;
        if(i===0) onturn = true;
        const newPlayer: GamePlayer = { id: i, name : 'Player'+i, nachos : 0, onTurn: onturn };
        gamePlayers.push(newPlayer);
    }
    return gamePlayers;
}

//Warum gehts nur mit diesem shit???
type playerProps = {
    player: GamePlayer
}
function DisplayPlayers( {player} : playerProps){
    if(player.onTurn === true){
        return <p>{player.name} {player.nachos} onTurn</p>;
    } else {
        return <p>{player.name} {player.nachos}</p>;
    }
}

function getWinner(players: GamePlayer[]){
    let nachos: number[] = [];
    players.forEach(players => {
        nachos.push(players.nachos);
    });
    return players[nachos.indexOf(Math.max(...nachos))];
}

export const MemoryGame = (playerCount: memoryGameProps) => {

    const food = ['burrito', 'nacho', 'tortilla', 'enchillada', 'chimichanga', 'taco'];
    const images = [imageBurrito, imageNacho, imageTortilla, imageEnchilada, imageChimichanga, imageTaco ];

    const [memoryCards,setMemoryCards] = useState(createRandomMemoryLayout(food, images));
    const [players, setPlayers] = useState(getDefaultPlayers(playerCount));

    const onClick = (index : number)=> {
        // warum muss man das so machen??
        // setMemoryCards(createNewStates(memoryCards, index)); geht nicht warum ?? :(
        let updatedValues = updateMemoryCards(memoryCards, players, index);
        let newMemoryCards = [...memoryCards];
        let updatedCards = updatedValues.memoryCards;
        for (let i = 0; i < memoryCards.length; i++){
                newMemoryCards[i].state = updatedCards[i].state;
        }
        //würde eigentlich gerne nur das haben
        setMemoryCards(newMemoryCards);
        setPlayers(updatedValues.gamePlayers);
        setTimeout(() => {
            setMemoryCards(resetValues(memoryCards));
            if(updatedValues.gameOver) {
                let winner = getWinner(players);
                alert('game over, the winner is ' + winner.name + ' with: ' + winner.nachos + ' nachos');
            }
        }, 1000);
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
