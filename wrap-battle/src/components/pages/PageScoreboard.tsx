import { HeaderScores } from '../parts/HeaderScores';
import trophy from '../../assets/svg/trophy.svg';
import nacho from '../../assets/svg/nacho.svg';
import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useRoom from '../../hooks/useRoom';
import { ScoreOverview } from '../parts/ScoreOverview';

export const PageScoreBoard = () => {
    const { players } = useRoom();

    return (
        <div className="pageScoreboard">
            <HeaderScores />
            <div className="background">
                <img
                    className="PageScoreboard-trophy"
                    src={trophy}
                    alt="trophy"
                />
                <ScoreOverview players={players ?? []} />
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
