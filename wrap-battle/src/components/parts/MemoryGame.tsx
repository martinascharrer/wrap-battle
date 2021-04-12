import { useEffect } from 'react';
import { Card } from '../../types/card';
import { Player } from '../../types/player';
import { MemoryCardList } from './MemoryCardList';
import { resetValues, updateMemoryCards } from '../../services/memorylogic';
import imageTaco from '../../assets/images/food/taco.jpg';
import imageBurrito from '../../assets/images/food/burrito.jpg';
import imageNacho from '../../assets/images/food/nacho.jpg';
import imageEnchilada from '../../assets/images/food/enchilada.jpg';
import imageChimichanga from '../../assets/images/food/chimichanga.jpg';
import imageTortilla from '../../assets/images/food/tortilla.jpg';
import useRoom from '../../hooks/useRoom';
import { setMemoryCards } from '../../services/room';

// muss man das immer machen?
type memoryGameProps = {
    playerCount: number;
};

function createRandomMemoryLayout(food: string[], images: string[]) {
    let foodCopy = food.concat(food);
    let empty = [];
    for (let i = 0; i < images.length; i++) {
        empty.push('no');
    }
    let imageCopy = images.concat(empty);
    const cardCount = foodCopy.length;
    const memoryCards = [];
    for (let i = 0; i < cardCount; i++) {
        let selectedIndex = Math.floor(
            Math.random() * Math.floor(foodCopy.length - 1)
        );
        const newMemoryCard: Card = {
            id: i,
            content: foodCopy[selectedIndex],
            image: imageCopy[selectedIndex],
            state: 0,
        };
        memoryCards.push(newMemoryCard);
        foodCopy.splice(selectedIndex, 1);
        imageCopy.splice(selectedIndex, 1);
    }
    return memoryCards;
}

function getWinner(players: Player[]) {
    let nachos: number[] = [];
    players.forEach((players) => {
        nachos.push(players.nachos);
    });
    return players[nachos.indexOf(Math.max(...nachos))];
}

export const MemoryGame = (playerCount: memoryGameProps) => {
    const food = [
        'burrito',
        'nacho',
        'tortilla',
        'enchillada',
        'chimichanga',
        'taco',
    ];
    const images = [
        imageBurrito,
        imageNacho,
        imageTortilla,
        imageEnchilada,
        imageChimichanga,
        imageTaco,
    ];

    const { room } = useRoom();

    useEffect(() => {
        const setUpMemoryBoard = async () => {
            if (room)
                await setMemoryCards(
                    room.id,
                    createRandomMemoryLayout(food, images)
                );
        };
        setUpMemoryBoard();
    }, []);

    const players: Player[] = room?.players ?? [];
    //console.log(players);
    console.log(room?.memoryCards);

    const onClick = (index: number) => {
        // warum muss man das so machen??
        // setMemoryCards(createNewStates(memoryCards, index)); geht nicht warum ?? :(
        if (room) {
            let updatedValues = updateMemoryCards(
                room?.memoryCards,
                room?.players,
                index
            );
            setMemoryCards(room.id, updatedValues.memoryCards);
            setTimeout(() => {
                setMemoryCards(room.id, resetValues(room?.memoryCards));
                if (updatedValues.gameOver) {
                    let winner = getWinner(players);
                    alert(
                        'game over, the winner is ' +
                            winner.name +
                            ' with: ' +
                            winner.nachos +
                            ' nachos'
                    );
                }
            }, 1000);
        }
    };

    return (
        <div className="memory-game">
            {room && (
                <MemoryCardList
                    memoryCards={room?.memoryCards}
                    onClick={onClick}
                />
            )}
            {players.map((player) => {
                if (player.isOnTurn) {
                    return (
                        <div className="MemoryGame-player-on-turn-score">
                            <p>
                                {player.name} {player.nachos} onTurn
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <div className="MemoryGame-player-score">
                            <p>
                                {player.name} {player.nachos}
                            </p>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default MemoryGame;
