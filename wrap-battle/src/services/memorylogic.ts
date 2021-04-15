import { Card, CardState } from '../types/card';
import { Player } from '../types/player';

export function getUncoveredIndexes(MemoryCards: Card[]) {
    let indexes: number[] = [];
    MemoryCards.forEach((memoryCard) => {
        if (memoryCard.state === CardState.OPENED) {
            indexes.push(memoryCard.id);
        }
    });
    return indexes;
}

export function updateMemoryCard(MemoryCards: Card[], ClickedIndex: number) {
    MemoryCards[ClickedIndex].state = CardState.OPENED;
    return MemoryCards;
}

export function updateGameState(
    MemoryCards: Card[],
    indexesOpenCards: number[]
) {
    if (
        MemoryCards[indexesOpenCards[0]].content ===
        MemoryCards[indexesOpenCards[1]].content
    ) {
        MemoryCards[indexesOpenCards[0]].state = CardState.FINISHED;
        MemoryCards[indexesOpenCards[1]].state = CardState.FINISHED;
    }
    return MemoryCards;
}

export function updatePlayerOnTurn(players: Player[]) {
    let index = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].isOnTurn) index = i;
    }
    players[index].isOnTurn = false;
    if (index === players.length - 1) {
        players[0].isOnTurn = true;
    } else {
        players[index + 1].isOnTurn = true;
    }
    return players;
}

export function resetValues(memoryCards: Card[], indexes: number[]) {
    indexes.forEach((index) => {
        memoryCards[index].state = CardState.CLOSED;
    });
    return memoryCards;
}

export function isGameOver(memoryCards: Card[]) {
    let winCardsCount = 0;
    memoryCards.forEach((memoryCard) => {
        if (memoryCard.state === CardState.FINISHED) winCardsCount++;
    });
    return winCardsCount === 12;
}
