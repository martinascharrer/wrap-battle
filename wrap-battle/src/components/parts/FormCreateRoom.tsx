import { useState } from 'react'
import firebase from 'firebase'
import { firestore } from '../../services/firestore'
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

function createRoom (userName: string) {
    return firestore.collection('rooms')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            host: {
                id: 0,
                name: userName,
            },
            code: 'A5jk4z',
            participants: [],
            maxParticipants: 5,
        });
}

export const FormCreateRoom = () => {
    const [user, setUser] = useState('');

    return (
        <div className="App">

            <br/>
            <TextField
                required
                id="filled-required"
                label="Enter Nickname"
                defaultValue="Enter your nickname"
                variant="filled"
                value={user}
                onChange={e => setUser(e.currentTarget.value)}
            />

            <br/>
            <br/>
            <Button variant="contained"
                    color="primary"
                    onClick={() => createRoom(user)}
                    href="">
                Create Room
            </Button>
        </div>
    );
}
