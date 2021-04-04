
import { MemoryCardType } from '../types/memoryCardType';
import { gamePlayer } from '../types/gamePlayer';


export function updateMemoryCards( MemoryCards: MemoryCardType[], GamePlayers: gamePlayer[], ClickedIndex : number){
    let memoryCards = MemoryCards;
    let gamePlayers = GamePlayers;
    memoryCards[ClickedIndex].state = 1;
    const uncoveredCards = memoryCards.filter(memoryCard => memoryCard.state === 1);
    const playerOnTurn = gamePlayers.findIndex(gamePlayer => gamePlayer.onTurn === true);
    if(uncoveredCards.length === 2){
        let uncoveredIDs : number[] = [];
        memoryCards.forEach(memoryCard => {
            if(memoryCard.state ===1) {
                uncoveredIDs.push(memoryCard.id);
            }
        });
        if(memoryCards[uncoveredIDs[0]].content === memoryCards[uncoveredIDs[1]].content){
            memoryCards[uncoveredIDs[0]].state = 2;
            memoryCards[uncoveredIDs[1]].state = 2;
            gamePlayers[playerOnTurn].nachos ++;
        } else {
            gamePlayers.forEach(gamePlayer => {
            gamePlayer.onTurn = false;
            });
            if(playerOnTurn >= gamePlayers.length-1){
                gamePlayers[0].onTurn = true;
            } else {
                gamePlayers[playerOnTurn+1].onTurn = true;
            }
            //memoryCards[uncoveredIDs[0]].state = 0;
            //memoryCards[uncoveredIDs[1]].state = 0;
        }
    } 
    return {memoryCards, gamePlayers};
}

export function resetValues(memoryCards: MemoryCardType[]){
    const uncoveredCards = memoryCards.filter(memoryCard => memoryCard.state === 1);
    if(uncoveredCards.length === 2){
        let uncoveredIDs : number[] = [];
        memoryCards.forEach(memoryCard => {
            if(memoryCard.state ===1) {
                uncoveredIDs.push(memoryCard.id);
            }
        });
        memoryCards[uncoveredIDs[0]].state = 0;
        memoryCards[uncoveredIDs[1]].state = 0;
    }
    return memoryCards;
}

