import firebase from 'firebase';
import { Player } from './player';
import { Card } from './card';

export interface Room {
    id: string,
    created: firebase.firestore.FieldValue,
    players: Player[],
    maxPlayers: number,
    timePerTurn: number,
    memoryCards: Card[],
    isActive: boolean
}
