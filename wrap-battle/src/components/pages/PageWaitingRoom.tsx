import {Footer} from '../parts/Footer';
import React from 'react';
import {WaitingOverview} from '../parts/WaitingOverview';

export const PageWaitingRoom = () => {

    return (
        <div className="pageWaitingRoom">
            <WaitingOverview />
            <Footer />
        </div>
    );
};
