import nacho from '../../assets/svg/nacho.svg';
import React from 'react';
import { Player } from '../../types/player';

type ScoreOverviewProps = {
    players: Player[];
};

export const ScoreOverview = ({ players }: ScoreOverviewProps) => {
    const playersOrdered = players?.sort((a, b) => {
        if (a?.nachos > b?.nachos) return -1;
        return 1;
    });
    return (
        <ol className="PageScoreBoard-list">
            {playersOrdered?.map((player, index) => {
                return (
                    <li
                        key={player.id}
                        className={`PageScoreBoard-listItem ${
                            index === 0 ? 'PageScoreBoard-listItem--winner' : ''
                        }`}
                        data-testid={player.id}
                    >
                        <p className="PageScoreboard-playerName">
                            {index + 1}. {player.name}
                        </p>
                        <div className="PageScoreboard-nachos">
                            <span>{player.nachos}</span>
                            <img
                                className="PageScoreboard-nachoImage"
                                src={nacho}
                                alt="nacho"
                            />
                        </div>
                    </li>
                );
            })}
        </ol>
    );
};
