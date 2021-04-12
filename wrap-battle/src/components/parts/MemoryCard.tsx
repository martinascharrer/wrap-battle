import { Card } from '../../types/card';

type memoryCardProps = {
    memoryCard: Card;
    onClick: Function;
};

function CardContent(props: { memoryCard: Card }) {
    if (props.memoryCard.state !== 0) {
        if (props.memoryCard.image !== 'no') {
            return (
                <div>
                    <img
                        src={props.memoryCard.image}
                        alt="memoryCardImage"
                        width="40"
                        height="40"
                        data-testid="card image"
                    />
                </div>
            );
        } else {
            return <h1 data-testid="card text">{props.memoryCard.content}</h1>;
        }
    } else {
        return <div />;
    }
}

export const MemoryCard = ({ memoryCard, onClick }: memoryCardProps) => {
    return (
        <div
            className={
                memoryCard.state === 2
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
