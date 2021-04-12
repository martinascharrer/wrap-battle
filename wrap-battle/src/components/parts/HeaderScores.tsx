import React from 'react';

import logo from '../../assets/images/logo_outlined.png';

export const HeaderScores = () => {
    return (
        <div className="header">
            <img
                src={logo}
                alt="logo"
                className="header-logo"
                data-testid="header logo"
            />

            <h1 className="header-text"> SCOREBOARD</h1>
        </div>
    );
};
