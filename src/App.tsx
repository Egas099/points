import './css/App.css';
import Game from './pages/Game';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './pages/Home';
import { init as socketInit } from './socketWorker';
import { useEffect } from 'react';

function App() {

    useEffect(() => {
        socketInit();
    })

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/play" exact>
                        <Game />
                    </Route>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div >
    );
}

export default App;
