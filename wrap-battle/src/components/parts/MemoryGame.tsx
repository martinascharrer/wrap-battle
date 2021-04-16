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
import imageSangria from '../../assets/svg/sangria.svg';
import imagePaella from '../../assets/svg/paella.svg';
import imagePatatasBravas from '../../assets/svg/patatasbravas.svg';
import imageJalapenos from '../../assets/svg/jalapenos.svg';
import imageSalsa from '../../assets/svg/salsa.svg';
import imageFajitas from '../../assets/svg/facitas.svg';
import useRoom from '../../hooks/useRoom';
import {
    setGameOver,
    setMemoryCards,
    setPlayers,
    setRestartTimer,
    setTimer,
    setUpdateTimer,
} from '../../services/room';
import { getPlayerFromStorage } from '../../services/player';
import { useTimer } from 'use-timer';

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

export const MemoryGame = () => {
    const food = [
        'burrito',
        'nachos',
        'tortilla',
        'enchi- llada',
        'chimi- changa',
        'taco',
        'chilli con carne',
        'churros',
        'gambas',
        'gazpacho',
        'guaca- mole',
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
    const {
        room,
        players,
        playerOnTurn,
        host,
        restartTimer,
        updateTimer,
    } = useRoom();

    const resetTimer = async (updatePlayer: boolean) => {
        let restart = !restartTimer;
        if (room) await setRestartTimer(room.id, restart);
        if (room && players) {
            let newPlayers = players;
            if (updatePlayer) newPlayers = updatePlayerOnTurn(newPlayers);
            await setPlayers(room.id, newPlayers);
        }
    };

    const { time, start, reset } = useTimer({
        initialTime: 20,
        endTime: 0,
        timerType: 'DECREMENTAL',
        interval: 1000,
        step: 1,
        onTimeUpdate: async (time) => {
            if (
                room &&
                players &&
                host?.id === getPlayerFromStorage()?.id &&
                time !== 20
            ) {
                let update = !room?.updateTimer;
                await setUpdateTimer(room?.id, update);
            }
        },
    });

    useEffect(() => {
        if (host?.id === getPlayerFromStorage()?.id && room) {
            setTimer(room.id, time);
            if (time === 0) resetTimer(true);
        }
    }, [updateTimer]);

    useEffect(() => {
        reset();
        start();
        if (room) setTimer(room.id, time);
    }, [restartTimer]);

    useEffect(() => {
        const setUpMemoryBoard = async () => {
            if (room)
                await setMemoryCards(
                    room.id,
                    createRandomMemoryLayout(food, images)
                );
        };
        setUpMemoryBoard();
        start();
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
                        await resetTimer(false);
                        if (isGameOver(room.memoryCards)) {
                            const winner = getWinner(players);
                            await setGameOver(room.id, winner);
                        }
                    } else {
                        await resetTimer(true);
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
        <div className="memory-game" data-testid="memory game">
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
                            <div className="playerOnTurnBox" key={player.id}>
                                <span
                                    className="playerOnTurnName"
                                    data-testid="player on turn name"
                                >
                                    {player.name}
                                </span>
                                <span
                                    className="playerOnTurnPoints"
                                    data-testid="player on turn nachos"
                                >
                                    {player.nachos}{' '}
                                </span>
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
                            <div className="playerNotOnTurnBox" key={player.id}>
                                <span
                                    className="playerNotOnTurnName"
                                    key={player.id}
                                    data-testid="player name"
                                >
                                    {player.name}
                                </span>
                                <span
                                    className="playerNotOnTurnPoints"
                                    data-testid="player nachos"
                                >
                                    {' '}
                                    {player.nachos}{' '}
                                </span>
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

export default MemoryGame;
