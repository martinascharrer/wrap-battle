import { FormJoinRoom } from '../parts/FormJoinRoom';
import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../assets/images/logo_outlined.png';
import {Button} from '@material-ui/core';

export const PageHome = () => {
    return (
        <div className="pageHome">
            <div className="background">
                <img src={logo}
                     alt="logo"
                     className="logo"
                     data-testid="headline"
                    />
                <FormJoinRoom />
                <br />

                <Link to="/create-room">
                    <Button
                        className="ButtonNewRoom"
                        variant="contained"
                        color="secondary"
                        data-testid="new room"
                    >
                        New room
                    </Button>

                </Link>
            </div>
        </div>
    );
};
