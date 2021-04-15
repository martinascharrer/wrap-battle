import React from 'react';

import logo from '../../assets/images/logo_outlined.png';
import stopwatch from '../../assets/svg/stopwatch.svg';
import { Player } from '../../types/player';
import { getPlayerFromStorage } from '../../services/player';

type headerProps = {
    playerOnTurn?: Player;
};

export const Header = ({ playerOnTurn }: headerProps) => {
    const player = getPlayerFromStorage();
    return (
        <div className="header">
            <img
                src={logo}
                alt="logo"
                className="header-logo"
                data-testid="header logo"
            />
            <h2 className="header-heading">LET'S FIGHT</h2>
            <img
                src={stopwatch}
                alt="stopwatch"
                className="header-stopwatch"
                data-testid="header stopwatch"
            />
            <p className="header-timecount" data-testid="time counter">
                {playerOnTurn && playerOnTurn.timeLeft}
            </p>
            <p className="header-text" data-testid="player on turn">
                {playerOnTurn?.id === player?.id
                    ? 'You are '
                    : playerOnTurn?.name + ' is '}
                picking cards
            </p>
        </div>
    );
};
