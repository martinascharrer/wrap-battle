import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { firestore as db } from '../services/firestore';
import { Room } from '../types/room';
import { Player } from '../types/player';

type roomParams = {
    id: string;
};

type roomOutput = {
    room?: Room;
    roomId?: string;
    isActive?: boolean;
    players?: Player[];
    playerOnTurn?: Player;
    host?: Player;
    timerValue ? : number;
    restartTimer? : number;
};

const useRoom = (): roomOutput => {
    const [room, setRoom] = useState<Room | undefined>();
    const params: roomParams = useParams();
    const roomId: string = params.id;
    const isActive = room?.isActive;
    const players = room?.players;
    const timerValue = room?.timerValue;
    const playerOnTurn = room?.players.find((player) => player.isOnTurn);
    const host = room?.players.find((player) => player.isHost);
    const restartTimer = room?.restartTimer;

    useEffect(() => {
        const unsubscribe = db
            .collection('rooms')
            .doc(roomId)
            .onSnapshot((room) => {
                if (room.exists)
                    setRoom(() => {
                        return { ...room.data(), id: params.id } as Room;
                    });
                else console.log('Room Not Found');
            });

        return () => {
            unsubscribe();
        };
    }, []);

    return { room, roomId, players, isActive, playerOnTurn, host, timerValue , restartTimer };
};

export default useRoom;
