import './css/App.css';
import Game from './pages/Game';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const MENU_PATH = '/menu';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/about" exact>
                        <About />
                    </Route>

                    <Route path="/single" exact>
                        <Game type="single" />
                    </Route>
                    <Route path="/multiplayer" exact>
                        <Game type="multiplayer" />
                    </Route>
                    <Route path={`${MENU_PATH}/`}>
                        <Home />
                    </Route>
                    <Route>
                        <Redirect to={`${MENU_PATH}/`} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
