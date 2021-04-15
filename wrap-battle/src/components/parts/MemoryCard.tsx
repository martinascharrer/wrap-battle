import { Card, CardState } from '../../types/card';

type memoryCardProps = {
    memoryCard: Card;
    onClick: Function;
};

function CardContent(props: { memoryCard: Card }) {
    if (props.memoryCard.state !== CardState.CLOSED) {
        if (props.memoryCard.image !== 'no') {
            return (
                <div>
                    <img
                        src={props.memoryCard.image}
                        alt="memoryCardImage"
                        data-testid="card image"
                        className="memory-card-image"
                    />
                </div>
            );
        } else {
            return (
                <h1 className="memory-card-content" data-testid="card text">
                    {props.memoryCard.content}
                </h1>
            );
        }
    } else {
        return <div />;
    }
}

export const MemoryCard = ({ memoryCard, onClick }: memoryCardProps) => {
    return (
        <div
            className={
                memoryCard.state === CardState.FINISHED
                    ? 'memory-card card-finished'
                    : 'memory-card'
            }
        >
            <button
                className="memory-card-button"
                onClick={() => onClick(memoryCard.id)}
            >
                <CardContent memoryCard={memoryCard} />
            </button>
        </div>
    );
};
