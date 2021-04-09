import { Card } from '../../types/card';
import {MemoryCard} from './MemoryCard';

type memoryCardListProps = {
    memoryCards : Card[];
    onClick: Function;
}

export const MemoryCardList = ({memoryCards,onClick} : memoryCardListProps ) => {

    return (
        <div className="memory-card-list" >
            {memoryCards.map((memoryCard)=>
             <MemoryCard key = {memoryCard.id} memoryCard={memoryCard} onClick={onClick} />
            )}
        </div>
    );
};