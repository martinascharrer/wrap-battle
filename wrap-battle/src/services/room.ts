import firebase from 'firebase/app';
import { genId } from '../utils/room';
import { firestore } from './firestore';
import { Room } from '../types/room';
import { createPlayer } from './player';

export async function createRoom(name: string): Promise<string | null> {
    const roomId = genId();
    try {
        const player = createPlayer(name);
        const room: Room = {
            id: roomId,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            host: player,
            participants: [],
            maxParticipants: 5,
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
            const players = room.data()?.participants;
            players.push(player);
            await firestore
                .collection('rooms')
                .doc(roomId)
                .update({ participants: players });
        }
    } catch (e) {
        console.error(e);
    }
}
