import firebase from 'firebase';
import { Player } from './player';
import { Card } from './card';

export type Room = {
    id: string;
    created: firebase.firestore.FieldValue;
    players: Player[];
    memoryCards: Card[];
    isActive: boolean;
    isGameOver: Boolean;
};
