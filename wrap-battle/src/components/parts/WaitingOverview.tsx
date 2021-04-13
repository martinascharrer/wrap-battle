import { useEffect } from 'react';
import copybutton from '../../assets/svg/copy.svg';
import { Player } from '../../types/player';
import useRoom from '../../hooks/useRoom';
import { getPlayerFromStorage } from '../../services/player';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import versus from '../../assets/images/vs.png';
import { setGameActive } from '../../services/room';

export const WaitingOverview = () => {
    const history = useHistory();
    const player: Player | null = getPlayerFromStorage();
    const { roomId, players, isActive, host } = useRoom();

    async function startGame() {
        if (roomId) await setGameActive(roomId);
        else console.error('room not found :(');
    }

    useEffect(() => {
        if (isActive) history.push(`/game/${roomId}`);
        // eslint-disable-next-line
    }, [isActive]);

    return (
        <div className="waitingOverview">
            <div className="roomPin" color="text.primary">
                {' '}
                <span id="copyText">{roomId}</span>
                <img
                    className="copyButton"
                    src={copybutton}
                    alt="copy-button"
                />
            </div>

            <div className="playerlist">
                <img className="versus" src={versus} alt="versus" />
                <br />
                <h4 className="players"> PLAYERS: </h4>
                <ul data-testid="player list">
                    {players?.map((player) => (
                        <li className="playerNameWait" key={player.name}>
                            {player.name}
                            {player.isHost && ' (host)'}
                        </li>
                    ))}
                </ul>
                {host && host?.id === player?.id ? (
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

            <div className="copyButtonContainer" />
        </div>
    );
};
