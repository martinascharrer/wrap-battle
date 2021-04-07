import React from 'react';

import logo from '../../assets/images/logo_outlined.png';
import stopwatch from '../../assets/svg/stopwatch.svg';





export const Header = () => {

    return (
        <div className="header">
            <img src={logo}
                 alt="logo"
                 className="header-logo"
                 data-testid="header logo"
            />
            <h1 className="header-heading">LET'S FIGHT</h1>
            <img src={stopwatch}
                 alt="stopwatch"
                 className="header-stopwatch"
                 data-testid="header stopwatch"
            />
            <p className="header-timecount"> 12 </p>
            <p className="header-text" > <b>PlayerName's turn...</b> </p>


        </div>
    );
};