import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { PageCreateRoom } from './components/pages/PageCreateRoom';
import { PageGameRoom } from './components/pages/PageGameRoom';
import { PageHome } from './components/pages/PageHome';
import { PageWaitingRoom } from './components/pages/PageWaitingRoom';
import { PageScoreBoard } from './components/pages/PageScoreboard';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#92C73F',
        },
        secondary: {
            main: '#F1D9AF',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
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
                        <Route path="/scoreboard/:id">
                            <PageScoreBoard />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
