import { HeaderScores } from '../parts/HeaderScores';
import trophy from '../../assets/svg/trophy.svg';
import nacho from '../../assets/svg/nacho.svg';
import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export const PageScoreBoard = () => {
    return (
        <div className="pageScoreboard">
            <HeaderScores />
            <div className="background">
                <img
                    className="PageScoreboard-trophy"
                    src={trophy}
                    alt="trophy"
                />
                <h1 className="PageScoreboard-headline">WINNER</h1>
                <p className="PageScoreboard-winner">
                    Player{' '}
                    <img
                        className="PageScoreboard-nacho"
                        src={nacho}
                        alt="nacho"
                    />
                </p>

                <br />
                <Link to="/">
                    <Button
                        className="PageScoreboard-ButtonPlayAgain"
                        variant="contained"
                        color="primary"
                        data-testid="new room"
                    >
                        Play again
                    </Button>
                </Link>
            </div>
        </div>
    );
};
