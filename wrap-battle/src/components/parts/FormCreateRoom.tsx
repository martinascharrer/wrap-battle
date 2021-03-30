import { useState } from 'react';
import { createRoom } from '../../services/room';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export const FormCreateRoom = () => {
    const [playerName, setPlayerName] = useState('');
    const history = useHistory();

    async function handleCreateRoom() {
        const roomId = await createRoom(playerName);
        history.push(`/wait/${roomId}`);
    }

    return (
        <div className="formCreateRoom">
            <TextField
                required
                id="filled-required"
                label="Enter Nickname"
                defaultValue="Enter your nickname"
                variant="filled"
                data-testid="name input"
                value={playerName}
                onChange={(e) => setPlayerName(e.currentTarget.value)}
            />
            <Button
                variant="contained"
                color="primary"
                data-testid="create button"
                onClick={handleCreateRoom}
            >
                Create room
            </Button>
        </div>
    );
};
