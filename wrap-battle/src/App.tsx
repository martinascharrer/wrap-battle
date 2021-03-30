import React from 'react'
import './App.css'
import { FormCreateRoom } from './components/parts/FormCreateRoom'
import logo from './assets/images/logo_outlined.png';


function App() {
    return (
        <div className="App">
            <img src={logo}
                 alt="logo"
                 className="logo"
            />
            <FormCreateRoom />
        </div>
    );
}

export default App;
