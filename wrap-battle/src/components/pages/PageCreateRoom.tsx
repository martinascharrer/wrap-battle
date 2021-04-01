import React from 'react';
import { Link } from 'react-router-dom';
import { FormCreateRoom } from '../parts/FormCreateRoom';

export const PageCreateRoom = () => {
    return (
        <div className="pageCreateRoom">
            <FormCreateRoom />
            <Link to="/">
                <button>Back home</button>
            </Link>
        </div>
    );
};
