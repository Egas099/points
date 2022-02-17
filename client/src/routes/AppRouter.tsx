import { FC } from 'react';
import {
    BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import About from '../pages/About/About';
import Game from '../pages/GamePlay/Game';
import MainMenuRouter from './MainMenuRouter';
export const MENU_PATH = 'menu';

const AppRouter: FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/about" exact component={About} />

                <Route path="/single" exact>
                    <Game type="single" />
                </Route>
                <Route path="/multiplayer" exact>
                    <Game type="multiplayer" />
                </Route>

                <Route path={`/${MENU_PATH}/`}>
                    <MainMenuRouter/>
                </Route>

                <Route>
                    <Redirect to={`/${MENU_PATH}/`} />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
