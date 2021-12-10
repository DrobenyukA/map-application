import React from 'react';

import Map from '../Map';

import './styles.css';

const App = () => {
    return (
        <div className="app">
            <h1 className="app-title">Map application code goes here...</h1>
            <div className="app-map">
                <Map />
            </div>
        </div>
    );
}

export default App;
