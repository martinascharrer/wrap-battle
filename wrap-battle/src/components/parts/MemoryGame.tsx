import { useEffect } from 'react';
import { Card, CardState } from '../../types/card';
import { Player } from '../../types/player';
import { MemoryCardList } from './MemoryCardList';
import {
    resetValues,
    updateGameState,
    updatePlayerOnTurn,
    updateMemoryCard,
    getUncoveredIndexes,
    isGameOver,
} from '../../services/memorylogic';
import imageTaco from '../../assets/svg/taco.svg';
import imageBurrito from '../../assets/svg/burrito.svg';
import imageNachos from '../../assets/svg/nachos.svg';
import nachoPoints from '../../assets/svg/nacho.svg';
import imageEnchilada from '../../assets/svg/enchilada.svg';
import imageChimichanga from '../../assets/svg/chimichanga.svg';
import imageTortilla from '../../assets/svg/tortilla.svg';
import imageChilliconcarne from '../../assets/svg/chiliconcarne.svg';
import imageChurros from '../../assets/svg/churros.svg';
import imageGambas from '../../assets/svg/gambas.svg';
import imageGazpacho from '../../assets/svg/gazpacho.svg';
import imageGuacamole from '../../assets/svg/guacomole.svg';
import imageNachoCheese from '../../assets/svg/nachocheese.svg';
import imageSangria from '../../assets/svg/nachocheese.svg';
import imagePaella from '../../assets/svg/paella.svg';
import imagePatatasBravas from '../../assets/svg/patatasbravas.svg';
import imageJalapenos from '../../assets/svg/jalapenos.svg';
import imageSalsa from '../../assets/svg/salsa.svg';
import imageFajitas from '../../assets/svg/facitas.svg';
import useRoom from '../../hooks/useRoom';
import { setGameOver, setMemoryCards, setPlayers } from '../../services/room';
import { getPlayerFromStorage } from '../../services/player';

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
            state: CardState.CLOSED,
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
        'nachos',
        'tortilla',
        'enchillada',
        'chimichanga',
        'taco',
        'chilli con carne',
        'churros',
        'gambas',
        'gazpacho',
        'guacamole',
        'nacho cheese',
        'sangria',
        'paella',
        'patatas bravas',
        'jalapenos',
        'salsa',
        'fajitas',
    ];
    const images = [
        imageBurrito,
        imageNachos,
        imageTortilla,
        imageEnchilada,
        imageChimichanga,
        imageTaco,
        imageChilliconcarne,
        imageChurros,
        imageGambas,
        imageGazpacho,
        imageGuacamole,
        imageNachoCheese,
        imageSangria,
        imagePaella,
        imagePatatasBravas,
        imageJalapenos,
        imageSalsa,
        imageFajitas,
    ];
    //players geht nicht
    const { room, players, playerOnTurn } = useRoom();

    useEffect(() => {
        const setUpMemoryBoard = async () => {
            if (room)
                await setMemoryCards(
                    room.id,
                    createRandomMemoryLayout(food, images)
                );
        };
        setUpMemoryBoard();
    }, [room?.isActive]);

    const onClick = async (index: number) => {
        if (
            room &&
            players &&
            playerOnTurn?.id === getPlayerFromStorage()?.id
        ) {
            let uncoveredIndexes = getUncoveredIndexes(room.memoryCards);
            if (!uncoveredIndexes.includes(index)) {
                if (uncoveredIndexes.length <= 1) {
                    await setMemoryCards(
                        room.id,
                        updateMemoryCard(room.memoryCards, index)
                    );
                    uncoveredIndexes.push(index);
                }
                if (uncoveredIndexes.length === 2) {
                    await setMemoryCards(
                        room.id,
                        updateGameState(room.memoryCards, uncoveredIndexes)
                    );

                    if (
                        room.memoryCards[uncoveredIndexes[0]].state ===
                        CardState.FINISHED
                    ) {
                        players.forEach((player) => {
                            if (player.isOnTurn) {
                                player.nachos++;
                            }
                        });
                        await setPlayers(room.id, players);

                        if (isGameOver(room.memoryCards)) {
                            const winner = getWinner(players);
                            await setGameOver(room.id, winner);
                        }
                    } else {
                        await setPlayers(room.id, updatePlayerOnTurn(players));
                        setTimeout(() => {
                            setMemoryCards(
                                room.id,
                                resetValues(room.memoryCards, uncoveredIndexes)
                            );
                        }, 1000);
                    }
                }
            }
        }
    };

    return (
        <div className="memory-game">
            {room?.memoryCards && (
                <MemoryCardList
                    memoryCards={room.memoryCards}
                    onClick={onClick}
                />
            )}
            {players &&
                players.map((player) => {
                    if (player.isOnTurn) {
                        return (
                            <div className="playerOnTurn" key={player.id}>
                                {player.name} {player.nachos}
                                <img
                                    className="nacho-points"
                                    src={nachoPoints}
                                    alt="nacho"
                                />{' '}
                                <br />
                            </div>
                        );
                    } else {
                        return (
                            <div className="playerNotOnTurn" key={player.id}>
                                {player.name} {player.nachos}{' '}
                                <img
                                    className="nacho-points"
                                    src={nachoPoints}
                                    alt="nacho"
                                />{' '}
                                <br />
                            </div>
                        );
                    }
                })}
        </div>
    );
};
