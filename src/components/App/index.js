import React from 'react';
import { useDispatch } from 'react-redux';

import Map from '../Map';
import { setUser } from '../../store/actions';

import './styles.css';

const App = () => {
    const dispatch = useDispatch();
    const handleLogin = React.useCallback(() => dispatch(
        setUser({
            name: 'Sam Gamgee',
            avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Sean_Astin_as_Samwise_Gamgee.png/280px-Sean_Astin_as_Samwise_Gamgee.png',
        })
    ));
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Map application code goes here...</h1>
                <div className="app-controls">
                    <button onClick={handleLogin}>Login</button>
                </div>
            </header>
            <main className="app-map">
                <Map />
            </main>
        </div>
    );
}

export default App;
