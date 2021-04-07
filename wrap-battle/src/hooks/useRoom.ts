import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { firestore as db } from '../services/firestore';
import { Room } from '../types/room';

interface roomParams {
    id: string;
}

interface Output {
    room?: Room;
}

const useRoom = (): Output => {
    const [room, setRoom] = useState<Room | undefined>();
    const params: roomParams = useParams();

    useEffect(() => {
        const unsubscribe = db
            .collection('rooms')
            .doc(params.id)
            .onSnapshot((room) => {
                if (room.exists)
                    setRoom({ ...room.data(), id: params.id } as Room);
                else console.log('Room Not Found');
            });

        return () => {
            unsubscribe();
        };
    }, []);

    return { room };
};

export default useRoom;
