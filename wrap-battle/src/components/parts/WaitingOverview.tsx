import React from 'react';
import { useParams } from 'react-router-dom';
import copybutton from '../../assets/svg/copy.svg';
import { Player } from '../../types/player';
import useRoom from '../../hooks/useRoom';
import { getPlayerFromStorage } from '../../services/player';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import versus from '../../assets/images/vs.png';

interface roomParams {
    id: string;
}

export const WaitingOverview = () => {
    const history = useHistory();
    const player: Player | null = getPlayerFromStorage();
    const { room } = useRoom();
    const params: roomParams = useParams();

    function startGame() {
        if (room?.id) history.push(`/game/${room.id}`);
        else console.error('room not found :(');
    }

    return (
        <div className="waitingOverview">
            <div className="roomPin" color="text.primary">
                {' '}
                <span id="copyText">{params.id}</span>
                <img
                    className="copyButton"
                    src={copybutton}
                    alt="copy-button"
                />
            </div>

            <div className="playerlist">
                <img className="versus" src={versus} alt="versus" />
                <br />
                <h4 className="host">HOST: </h4>
                {room?.host.name}
                <p>
                    <h4 className="players"> PLAYERS: </h4>
                    {room?.participants.map((p) => (
                        <p className="playerNameWait" key={p.name}>
                            {' '}
                            {p.name}
                        </p>
                    ))}
                </p>
                {room?.host.id === player?.id ? (
                    <Button
                        onClick={startGame}
                        className="ButtonStartGame"
                        variant="contained"
                        color="primary"
                        data-testid="create button"
                    >
                        Start game
                    </Button>
                ) : (
                    <span className="waitforhost">
                        {' '}
                        Waiting for other players{' '}
                    </span>
                )}
            </div>

            <div className="copyButtonContainer"></div>
        </div>
    );
};
