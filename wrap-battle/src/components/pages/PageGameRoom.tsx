import { useParams } from 'react-router-dom';

interface roomParams {
    id: string;
}

export const PageGameRoom = () => {
    const params: roomParams = useParams();
    return (
        <div className="pageWaitingRoom">
            you are in game room: <em>{params.id}</em>
        </div>
    );
};
