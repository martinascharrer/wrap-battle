import { MemoryGame } from '../parts/MemoryGame';
import { Header } from '../parts/Header';
import useRoom from '../../hooks/useRoom';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export const PageGameRoom = () => {
    const history = useHistory();
    const { playerOnTurn, isGameOver, roomId } = useRoom();

    useEffect(() => {
        if (isGameOver) history.push(`/scoreboard/${roomId}`);
    }, [isGameOver, history, roomId]);

    return (
        <div className="pageGameRoom">
            <Header playerOnTurn={playerOnTurn} />
            <MemoryGame />
        </div>
    );
};
