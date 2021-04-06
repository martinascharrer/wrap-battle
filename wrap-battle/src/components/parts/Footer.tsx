import React from 'react';
import { useParams } from 'react-router-dom';



interface roomParams {
    id: string;
}


export const Footer = () => {

const params: roomParams = useParams();
    return (
        <div className="footer">
            <p className="footer-waiting">Wait for your host to start the game! </p>
            <p className="footer-room-id">you are in game room: <em>{params.id}</em></p>
        </div>
    );
};