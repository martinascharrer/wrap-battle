import firebase from 'firebase';
import { Player } from './player';

export interface Room {
    id: string;
    created: firebase.firestore.FieldValue;
    host: Player;
    participants: Array<Player>;
    maxParticipants: number;
}
