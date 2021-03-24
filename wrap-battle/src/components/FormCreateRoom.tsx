import { useState } from 'react'
import firebase from 'firebase'
import { firestore } from '../utils/firestore'

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
            <label>Enter your name dear host: </label>
            <input
                type="text"
                placeholder="name"
                value={user}
                onChange={e => setUser(e.currentTarget.value)}
            />
            <br/>
            <button onClick={() => createRoom(user)}>Create room</button>
        </div>
    );
}
