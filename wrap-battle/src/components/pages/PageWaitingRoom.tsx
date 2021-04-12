import { Footer } from '../parts/Footer';
import React from 'react';
import { WaitingOverview } from '../parts/WaitingOverview';
import logo from '../../assets/images/logo_outlined.png';

export const PageWaitingRoom = () => {
    return (
        <div className="pageWaitingRoom">
            <img className="WaitingOverview-logo" src={logo} alt="logo" />
            <WaitingOverview />
            <Footer />
        </div>
    );
};
