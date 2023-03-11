import React from 'react';
import './App.css';
import {Header} from "./common/components/header/Header";
import {Nav} from "./common/components/nav/Nav";

function App() {
    return (
        <div className="App">
            <Header/>
            <Nav/>
        </div>
    );
}

export default App;
