import './css/App.css';
import Game from './pages/Game';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './pages/Home';

function App() {

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
                </Switch>
            </Router>
        </div >
    );
}

export default App;
