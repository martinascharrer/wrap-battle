import { MemoryGame } from '../parts/MemoryGame';
import { Header } from '../parts/Header';
import useRoom from '../../hooks/useRoom';

export const PageGameRoom = () => {
    const { playerOnTurn } = useRoom();

    return (
        <div className="pageGameRoom">
            <Header playerOnTurn={playerOnTurn} />
            <MemoryGame playerCount={3} />
        </div>
    );
};
