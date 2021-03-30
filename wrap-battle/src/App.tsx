import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { PageCreateRoom } from './components/pages/PageCreateRoom';
import { PageGameRoom } from './components/pages/PageGameRoom';
import { PageHome } from './components/pages/PageHome';
import { PageWaitingRoom } from './components/pages/PageWaitingRoom';
import { PageScoreBoard } from './components/pages/PageScoreboard';
import logo from './assets/images/logo_outlined.png';

function App() {
    return (
        <Router>
            <div className="App">
                <img src={logo}
                     alt="logo"
                     className="logo"
                     data-testid="headline"
                />
                <Switch>
                    <Route path="/" exact>
                        <PageHome />
                    </Route>
                    <Route path="/create-room">
                        <PageCreateRoom />
                    </Route>
                    <Route path="/wait/:id">
                        <PageWaitingRoom />
                    </Route>
                    <Route path="/game/:id">
                        <PageGameRoom />
                    </Route>
                    <Route path="/leaderboard/:id">
                        <PageScoreBoard />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
