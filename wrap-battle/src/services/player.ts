import { genId } from '../utils/room';
import { Player } from '../types/player';

const SESSION_KEY_USER = 'user';

export function createHost(name: string) {
    return createPlayer(name, true);
}

export function createPlayer(name: string, isHost: boolean = false) {
    const newPlayer: Player = {
        id: genId(),
        name,
        isHost,
        isOnTurn: isHost,
        nachos: 0,
    };
    sessionStorage.setItem(SESSION_KEY_USER, JSON.stringify(newPlayer));
    return newPlayer;
}

export function getPlayerFromStorage(): Player | null {
    const user = sessionStorage.getItem(SESSION_KEY_USER);
    if (user) return JSON.parse(user) as Player;
    return null;
}
