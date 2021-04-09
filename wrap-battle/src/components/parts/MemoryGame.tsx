import { useState, useEffect } from 'react';
import { Card } from '../../types/card';
import { Player } from '../../types/player';
import {MemoryCardList} from './MemoryCardList';
import { resetValues, updateGameState, updatePlayerOnTurn, updateMemoryCard, getUncoveredIndexes} from '../../services/memorylogic';
import imageTaco from '../../assets/images/food/taco.jpg';
import imageBurrito from '../../assets/images/food/burrito.jpg';
import imageNacho from '../../assets/images/food/nacho.jpg';
import imageEnchilada from '../../assets/images/food/enchilada.jpg';
import imageChimichanga from '../../assets/images/food/chimichanga.jpg';
import imageTortilla from '../../assets/images/food/tortilla.jpg';
import useRoom from '../../hooks/useRoom';
import {setMemoryCards} from  '../../services/room';

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
        const newMemoryCard : Card = {id : i, content:foodCopy[selectedIndex], image:imageCopy[selectedIndex], state:0};
        memoryCards.push(newMemoryCard);
        foodCopy.splice(selectedIndex,1);
        imageCopy.splice(selectedIndex,1);
    }
    return memoryCards;
}

function getWinner(players: Player[]){
    let nachos: number[] = [];
    players.forEach(players => {
        nachos.push(players.nachos);
    });
    return players[nachos.indexOf(Math.max(...nachos))];
}

export const MemoryGame = (playerCount: memoryGameProps) => {

    const food = ['burrito', 'nacho', 'tortilla', 'enchillada', 'chimichanga', 'taco'];
    const images = [imageBurrito, imageNacho, imageTortilla, imageEnchilada, imageChimichanga, imageTaco ];
    const {room} = useRoom();

    useEffect(() => {
        const setUpMemoryBoard =  async () => {
            if (room) await setMemoryCards(room.id, createRandomMemoryLayout(food, images));
        };
        setUpMemoryBoard();
    }, []);

    const players: Player[] = room?.players ?? [];


    const onClick = (index : number)=> {
        if(room) {
            let uncoveredIndexes = getUncoveredIndexes(room?.memoryCards);
            if(uncoveredIndexes.length <= 1){
                setMemoryCards(room.id, updateMemoryCard(room?.memoryCards, index));
                uncoveredIndexes.push(index);
            }
            if(uncoveredIndexes.length === 2){
                setMemoryCards(room.id, updateGameState(room?.memoryCards, uncoveredIndexes));
                if(room?.memoryCards[uncoveredIndexes[0]].state === 2){
                    room.players.forEach(player => {
                        if(player.isOnTurn) player.nachos++;
                    });
                    let winCardsCount = 0;
                    room?.memoryCards.forEach(memoryCard => {
                        if(memoryCard.state === 2) winCardsCount++;
                    });
                    if(winCardsCount === room?.memoryCards.length){
                        let winner = getWinner(players);
                        alert('game over, the winner is ' + winner.name + ' with: ' + winner.nachos + ' nachos');
                    }
                } else {
                    room.players = updatePlayerOnTurn(players);
                    setTimeout(() => {
                        setMemoryCards(room.id, resetValues(room?.memoryCards, uncoveredIndexes));
                    }, 1000);
                }
            }
        }
    };


    return (
        <div className="memory-game">
            {
                room && (<MemoryCardList memoryCards={room?.memoryCards} onClick={onClick} />)
            }
            {
            players.map((player)=>
            {
                if(player.isOnTurn){
                        return <p>{player.name} {player.nachos} onTurn</p>;
                    } else {
                        return <p>{player.name} {player.nachos}</p>;
                    }
                }
            )}
        </div>
    );
};


export default MemoryGame;
