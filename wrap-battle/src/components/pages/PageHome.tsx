import { FormJoinRoom } from '../parts/FormJoinRoom';
import { Link } from 'react-router-dom';
import React from 'react';

export const PageHome = () => {
    return (
        <div className="pageHome">
            <FormJoinRoom />
            <br />
            or:
            <br />
            <Link to="/create-room">
                <button>New room</button>
            </Link>
        </div>
    );
};
