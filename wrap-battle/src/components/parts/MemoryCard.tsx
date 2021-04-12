import { Card } from '../../types/card';

type memoryCardProps = {
    memoryCard : Card
    onClick: Function;
}

function ShowContent(props: {memorycard: Card}){
    if(props.memorycard.state === 0){
        return <div></div>;
    } else if (props.memorycard.state === 1) {
        if(props.memorycard.image !== 'no') {
            return <img src={props.memorycard.image} alt="memoryCardImage" width="40" height="40" />;
        } else {
            return <h1>{props.memorycard.content}</h1>;
        }
    } else {
        if(props.memorycard.image !== 'no') {
            return <div><img src={props.memorycard.image} alt="memoryCardImage" width="40" height="40" /> safe </div>;
        } else {
            return <h1>{props.memorycard.content} safe</h1>;
        }
    }
}

export const MemoryCard = ({memoryCard, onClick} : memoryCardProps) => {
    return (
        <div className="memory-card" >
            <button className="memory-card-button" onClick = {()=> onClick(memoryCard.id)}>
                <ShowContent memorycard={memoryCard}/>
            </button>
        </div>
    );
};
