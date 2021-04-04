import { MemoryCardType } from '../../types/memoryCardType';

type memoryCardProps = {
    memoryCard : MemoryCardType
    onClick: Function;
}

function ShowContent(props:{state:number,content:string}){
    if(props.state === 0){
        return <div></div>;
    } else if (props.state === 1) {
        return <h1>{props.content}</h1>;
    } else {
        return <h1>{props.content} Safe</h1>;
    }
}

export const MemoryCard = ({memoryCard, onClick} : memoryCardProps) => {
    return (
        <div className="memory-card" >
            <button className="memory-card-button" onClick = {()=> onClick(memoryCard.id)}>
                <ShowContent state={memoryCard.state} content={memoryCard.content}/>
            </button>
        </div>
    );
};
