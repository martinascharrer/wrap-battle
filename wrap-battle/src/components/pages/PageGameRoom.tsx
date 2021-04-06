import {Header} from '../parts/Header';
import {GameField} from '../parts/GameField';
import {PointsOverview} from '../parts/PointsOverview';




export const PageGameRoom = () => {

    return (
        <div className="pageGameRoom">
            <Header />
            <GameField/>
            <PointsOverview/>
        </div>
    );
};
