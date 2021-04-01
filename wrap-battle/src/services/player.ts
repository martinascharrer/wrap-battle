import { genId } from '../utils/room';
import { Player } from '../types/player';

const SESSION_KEY_USER = 'user';

export function createPlayer(name: string) {
    const newPlayer: Player = { id: genId(), name };
    sessionStorage.setItem(SESSION_KEY_USER, JSON.stringify(newPlayer));
    return newPlayer;
}

export function getPlayerFromStorage(): Player | null {
    const user = sessionStorage.getItem(SESSION_KEY_USER);
    if (user) return JSON.parse(user) as Player;
    return null;
}
