import { MemoryGame } from '../parts/MemoryGame';
import {Header} from '../parts/Header';
import {PointsOverview} from '../parts/PointsOverview';

export const PageGameRoom = () => {

    return (
        <div className="pageGameRoom">
            <Header />
            <MemoryGame playerCount = {3} />
            <PointsOverview/>
        </div>
    );
};
