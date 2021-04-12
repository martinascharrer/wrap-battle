import { useEffect, useState } from 'react';
import { Card, CardState } from '../../types/card';
import { Player } from '../../types/player';
import {MemoryCardList} from './MemoryCardList';
import { resetValues, updateGameState, updatePlayerOnTurn, updateMemoryCard, getUncoveredIndexes, gameOver} from '../../services/memorylogic';
import imageTaco from '../../assets/svg/taco.svg';
import imageBurrito from '../../assets/svg/burrito.svg';
import imageNachos from '../../assets/svg/nachos.svg';
import imageEnchilada from '../../assets/svg/enchilada.svg';
import imageChimichanga from '../../assets/svg/chimichanga.svg';
import imageTortilla from '../../assets/svg/tortilla.svg';
import imageChilliconcarne from '../../assets/svg/chiliconcarne.svg';
import imageChurros from '../../assets/svg/churros.svg';
import imageGambas from '../../assets/svg/gambas.svg';
import imageGazpacho from '../../assets/svg/gazpacho.svg';
import imageGuacamole from '../../assets/svg/guacomole.svg';
import imageNachoCheese from '../../assets/svg/nachocheese.svg';
import imageSangria from '../../assets/svg/nachocheese.svg';
import imagePaella from '../../assets/svg/paella.svg';
import imagePatatasBravas from '../../assets/svg/patatasbravas.svg';
import imageJalapenos from '../../assets/svg/jalapenos.svg';
import imageSalsa from '../../assets/svg/salsa.svg';
import imageFajitas from '../../assets/svg/facitas.svg';
import useRoom from '../../hooks/useRoom';
import {setMemoryCards, setPlayers} from  '../../services/room';
import { getPlayerFromStorage } from '../../services/player';
import { useTimer } from 'use-timer';

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
        const newMemoryCard : Card = {id : i, content:foodCopy[selectedIndex], image:imageCopy[selectedIndex], state:CardState.CLOSED};
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

    const food = ['burrito', 'nachos', 'tortilla', 'enchillada', 'chimichanga', 'taco', 'chilli con carne', 'churros', 'gambas',
        'gazpacho', 'guacamole', 'nacho cheese', 'sangria', 'paella', 'patatas bravas', 'jalapenos', 'salsa', 'fajitas'];
    const images = [imageBurrito, imageNachos, imageTortilla, imageEnchilada, imageChimichanga, imageTaco, imageChilliconcarne, 
        imageChurros, imageGambas, imageGazpacho, imageGuacamole, imageNachoCheese, imageSangria, imagePaella, imagePatatasBravas,
        imageJalapenos, imageSalsa ,imageFajitas];
    //players geht nicht 
    const {room, players, playerOnTurn} = useRoom();

    resetTimer(){
        if(room && players ){
            let newPlayers = updatePlayerOnTurn(players);
            reset();
            start();
            players.forEach(player => {
                if(player.isOnTurn) {
                    player.timeLeft=time;
                } 
            });
            setPlayers(room.id, newPlayers);
        }
    }
    const {time, start, pause, reset, status} = useTimer({
        initialTime: 20,
        endTime: 0,
        timerType: 'DECREMENTAL',
        interval: 2000,
        step: 2,
        onTimeUpdate: (time) => {
            if(room && players ){
                players.forEach(player => {
                    if(player.isOnTurn) {
                        player.timeLeft=time;
                    } 
                });
                setPlayers(room.id, players);
            }
        },
        onTimeOver: () => {
            resetTimer();
        }
    });


    useEffect(() => {
        const setUpMemoryBoard =  async () => {
            if (room) await setMemoryCards(room.id, createRandomMemoryLayout(food, images));
            start();
        };
        setUpMemoryBoard();
    },[room?.isActive]);

    const onClick = (index : number)=> {
        if(room && players && playerOnTurn?.id === getPlayerFromStorage()?.id) {
            let uncoveredIndexes = getUncoveredIndexes(room.memoryCards);
            if(!uncoveredIndexes.includes(index)){
                if(uncoveredIndexes.length <= 1){
                    setMemoryCards(room.id, updateMemoryCard(room.memoryCards, index));
                    uncoveredIndexes.push(index);
                }
                if(uncoveredIndexes.length === 2){
                    setMemoryCards(room.id, updateGameState(room.memoryCards, uncoveredIndexes));
    
                    if(room.memoryCards[uncoveredIndexes[0]].state === CardState.FINISHED){
                        players.forEach(player => {
                            if(player.isOnTurn) {
                                player.nachos++;
                            } 
                        });
                        setPlayers(room.id, players);

                        if(gameOver(room.memoryCards)){
                            let winner = getWinner(players);
                            alert('game over, the winner is ' + winner.name + ' with: ' + winner.nachos + ' nachos');
                        }
                    } else {
                        setPlayers(room.id, updatePlayerOnTurn(players));
                        setTimeout(() => {
                            setMemoryCards(room.id, resetValues(room.memoryCards, uncoveredIndexes));
                        }, 1000);
                    }
            }
            }
        }
    };


    return (
        <div className="memory-game">
            {
                room?.memoryCards && (<MemoryCardList memoryCards={room.memoryCards} onClick={onClick} />)
            }
            {
            players && players.map((player)=>
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
