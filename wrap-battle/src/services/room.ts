import firebase from 'firebase/app';
import { genId } from '../utils/room';
import { firestore } from './firestore';
import { Room } from '../types/room';
import { Card } from '../types/card';
import { Player } from '../types/player';
import { createHost, createPlayer } from './player';

export async function createRoom(name: string): Promise<string | null> {
    const roomId = genId();
    try {
        const player = createHost(name);
        const room: Room = {
            id: roomId,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            players: [player],
            memoryCards: [],
            isActive: false,
            timerValue: 0,
            updateTimer: false,
            restartTimer: false,
            isGameOver: false,
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

export async function setGameActive(roomId: string) {
    try {
        await firestore
            .collection('rooms')
            .doc(roomId)
            .update({ isActive: true });
    } catch (e) {
        console.error(e);
    }
}

export async function setGameOver(roomId: string, winner: Player) {
    try {
        await firestore
            .collection('rooms')
            .doc(roomId)
            .update({ isGameOver: true, winner });
    } catch (e) {
        console.error(e);
    }
}

export async function setMemoryCards(roomId: string, memoryCards: Card[]) {
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

export async function setPlayers(roomId: string, players: Player[]) {
    try {
        const room = await firestore.collection('rooms').doc(roomId).get();
        if (room.exists) {
            await firestore
                .collection('rooms')
                .doc(roomId)
                .update({ players: players });
        }
    } catch (e) {
        console.error(e);
    }
}

export async function setTimer(roomId: string, time: number) {
    try {
        const room = await firestore.collection('rooms').doc(roomId).get();
        if (room.exists) {
            await firestore
                .collection('rooms')
                .doc(roomId)
                .update({ timerValue: time });
        }
    } catch (e) {
        console.error(e);
    }
}


export async function setRestartTimer(roomId: string, value: boolean) {
    try {
        const room = await firestore.collection('rooms').doc(roomId).get();
        if (room.exists) {
            await firestore
                .collection('rooms')
                .doc(roomId)
                .update({ restartTimer: value });
        }
    } catch (e) {
        console.error(e);
    }
}

export async function setUpdateTimer(roomId: string, value: boolean) {
    try {
        const room = await firestore.collection('rooms').doc(roomId).get();
        if (room.exists) {
            await firestore
                .collection('rooms')
                .doc(roomId)
                .update({ updateTimer: value });
        }
    } catch (e) {
        console.error(e);
    }
}



