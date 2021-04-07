import { genId } from '../utils/room';
import { Player } from '../types/player';
import { firestore } from './firestore';

const SESSION_KEY_USER = 'user';

export function createPlayer(name: string, isHost: boolean = false) {
    const newPlayer: Player = { id: genId(), name, isHost, isOnTurn:false, nachos:0 };
    sessionStorage.setItem(SESSION_KEY_USER, JSON.stringify(newPlayer));
    return newPlayer;
}

export function getPlayerFromStorage(): Player | null {
    const user = sessionStorage.getItem(SESSION_KEY_USER);
    if (user) return JSON.parse(user) as Player;
    return null;
}

export async function getAllPlayers(roomId: string) {
    let players = null;
    try {
        const room = await firestore.collection('rooms').doc(roomId).get();
        if (room.exists) players = room.data()?.players;
    } catch (e) {
        console.error(e);
    }
    return players;
}
