import React from 'react';
import { Link } from 'react-router-dom';
import { FormCreateRoom } from '../parts/FormCreateRoom';
import logo from '../../assets/images/logo_outlined.png';
import {Button} from '@material-ui/core';

export const PageCreateRoom = () => {
    return (
        <div className="pageCreateRoom">
            <div className="background">
                <img src={logo}
                     alt="logo"
                     className="logo"
                     data-testid="headline"
                />
                    <FormCreateRoom />
            <br />

                <Link to="/">
                    <Button
                        className="ButtonBackHome"
                        variant="contained"
                        color="secondary"
                        data-testid="back home"
                    >
                        Back home
                    </Button>
                </Link>
            </div>
        </div>
    );
};
