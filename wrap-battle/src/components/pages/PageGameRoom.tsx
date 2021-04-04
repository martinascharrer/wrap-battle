import { useParams } from 'react-router-dom';
import { MemoryGame } from '../parts/MemoryGame';

interface roomParams {
    id: string;
}

export const PageGameRoom = () => {
    const params: roomParams = useParams();
    return (
        <div className="pageWaitingRoom">
            you are in game room: <em>{params.id}</em>
            <MemoryGame playerCount = {3} />
        </div>
    );
};
