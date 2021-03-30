import { Player } from '../../types/player';
import useRoom from '../../hooks/useRoom';
import { getPlayerFromStorage } from '../../services/player';
import { useHistory } from 'react-router-dom';

export const PageWaitingRoom = () => {
    const history = useHistory();
    const player: Player | null = getPlayerFromStorage();
    const { room } = useRoom();

    function startGame() {
        if (room?.id) history.push(`/game/${room.id}`);
        else console.error('room not found :(');
    }

    return (
        <div className="pageWaitingRoom">
            <span>host: </span>
            {room?.host.name}
            <p>
                <span>players: </span>
                {room?.participants.map((p) => (
                    <p key={p.name}>{p.name}</p>
                ))}
            </p>
            {room?.host.id === player?.id ? (
                <button onClick={startGame}>start game</button>
            ) : (
                'wait for your host to start the game!'
            )}
        </div>
    );
};
