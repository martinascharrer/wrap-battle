import { MemoryGame } from '../parts/MemoryGame';
import { Header } from '../parts/Header';
import { PointsOverview } from '../parts/PointsOverview';
import useRoom from '../../hooks/useRoom';

export const PageGameRoom = () => {
    const { playerOnTurn } = useRoom();

    return (
        <div className="pageGameRoom">
            <Header playerOnTurn={playerOnTurn} />
            <MemoryGame playerCount={3} />
            <PointsOverview />
        </div>
    );
};
