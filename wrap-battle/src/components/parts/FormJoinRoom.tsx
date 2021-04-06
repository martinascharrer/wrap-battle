import { useState } from 'react';
import { joinRoom } from '../../services/room';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export const FormJoinRoom = () => {
    const history = useHistory();
    const [playerName, setPlayerName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    async function handleJoinRoom() {
        await joinRoom(roomCode, playerName);
        history.push(`/wait/${roomCode}`);
    }

    return (
        <div className="App">
            <TextField
                className="textfield"
                required
                id="filled-required"
                label="Enter PIN"
                variant="filled"
                data-testid="room code input"
                value={roomCode}
                onChange={(e) => setRoomCode(e.currentTarget.value)}
            />
            <br />
            <br />
            <TextField
                className="textfield"
                required
                id="filled-required"
                label="Enter Nickname"
                variant="filled"
                data-testid="name input"
                value={playerName}
                onChange={(e) => setPlayerName(e.currentTarget.value)}
            />
            <br />
            <br />
            <Button
                data-testid="join button"
                className="ButtonJoinRoom"
                variant="contained"
                color="primary"
                onClick={handleJoinRoom}
            >
                Join room
            </Button>
        </div>
    );
};
