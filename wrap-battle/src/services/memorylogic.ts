
import { Card } from '../types/card';
import { Player } from '../types/player';

export function getUncoveredIndexes(MemoryCards: Card[]){
    let indexes: number[] = [];
    MemoryCards.forEach(memoryCard => {
        if(memoryCard.state === 1){
            indexes.push(memoryCard.id);
        }
    });
    return indexes;
}

export function updateMemoryCard(MemoryCards: Card[], ClickedIndex : number){
    MemoryCards[ClickedIndex].state = 1;
    return MemoryCards;
}

export function updateGameState(MemoryCards: Card[], indexesOpenCards: number []){
    if(MemoryCards[indexesOpenCards[0]].content === MemoryCards[indexesOpenCards[1]].content){
        MemoryCards[indexesOpenCards[0]].state = 2;
        MemoryCards[indexesOpenCards[1]].state = 2;
    }
    return MemoryCards;
}

export function updatePlayerOnTurn(players: Player[]){
    let index = 0; 
    for(let i = 0; i < players.length; i++){
        if(players[i].isOnTurn) index = i;
    }
    players[index].isOnTurn = false;
    if(index === players.length-1){
        players[0].isOnTurn = true;
    } else {
        players[index+1].isOnTurn = true;
    }
    return players;
}

export function resetValues(memoryCards: Card[], indexes: number[]){
    indexes.forEach(index => {
        memoryCards[index].state = 0;
    });
    return memoryCards;
}
