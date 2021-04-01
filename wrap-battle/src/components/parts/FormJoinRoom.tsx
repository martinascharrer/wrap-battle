import { useState } from 'react';
import { joinRoom } from '../../services/room';
import { useHistory } from 'react-router-dom';

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
            <label>Nickname: </label>
            <input
                type="text"
                placeholder="name"
                value={playerName}
                data-testid="name input"
                onChange={(e) => setPlayerName(e.currentTarget.value)}
            />
            <br />
            <label>Room code:</label>
            <input
                type="text"
                placeholder="name"
                value={roomCode}
                data-testid="room code input"
                onChange={(e) => setRoomCode(e.currentTarget.value)}
            />
            <br />
            <button data-testid="join button" onClick={handleJoinRoom}>
                Join room
            </button>
        </div>
    );
};
