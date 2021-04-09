import firebase from 'firebase/app';
import { genId } from '../utils/room';
import { firestore } from './firestore';
import { Room } from '../types/room';
import { createPlayer} from './player';
import { Card } from '../types/card';

export async function createRoom(name: string): Promise<string | null> {
    const roomId = genId();
    try {
        const player = createPlayer(name, true);
        const room: Room = {
            id: roomId,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            players: [player],
            maxPlayers: 5,
            memoryCards: [],
            timePerTurn: 25,
            isActive: false
        };
        await firestore.collection('rooms').doc(roomId).set(room);
    } catch (e) {
        console.error(e);
    }
    return roomId;
}

export async function joinRoom(roomId: string, name: string) {
    try {
        const player = createPlayer(name);
        const room = await firestore.collection('rooms').doc(roomId).get();
        if (room.exists) {
            const players = room.data()?.players;
            players.push(player);
            await firestore
                .collection('rooms')
                .doc(roomId)
                .update({ players: players });
        }
    } catch (e) {
        console.error(e);
    }
}


export async function setMemoryCards(roomId: string, memoryCards: Card[] ) {
    try {
        const room = await firestore.collection('rooms').doc(roomId).get();
        if (room.exists) {
            await firestore
                .collection('rooms')
                .doc(roomId)
                .update({ memoryCards: memoryCards });
        }
    } catch (e) {
        console.error(e);
    }
}

