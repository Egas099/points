import React, { FC } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

const About = React.lazy(() => import('../pages/About/About'));
const Game = React.lazy(() => import('../pages/GamePlay/Game'));
const MainMenuRouter = React.lazy(() => import('./MainMenuRouter'));

export const MENU_PATH = 'menu';

const AppRouter: FC = () => {
    return (
        <Router basename="/points">
            <Switch>
                <Route path="/about" exact component={About} />

                <Route path="/single" exact>
                    <Game type="single" />
                </Route>
                <Route path="/multiplayer" exact>
                    <Game type="multiplayer" />
                </Route>

                <Route path={`/${MENU_PATH}/`}>
                    <MainMenuRouter />
                </Route>

                <Route>
                    <Redirect to={`/${MENU_PATH}/`} />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
