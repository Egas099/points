import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MENU_PATH, NEW_GAME_PATH } from './constants';
import MainMenuHome from './pages/MainMenuHome';
import MainMenuLoad from './pages/MainMenuLoad';
import MainMenuNewGame from './pages/MainMenuNewGame';
import MainMenuSettings from './pages/MainMenuSettings';
import './index.css';

const MainMenu: FC = () => (
    <div className="main-menu__wrapper">
        <Switch>
            <Route path={`/${MENU_PATH}/${NEW_GAME_PATH}`}>
                <Switch>
                    <Route path={`/${MENU_PATH}/${NEW_GAME_PATH}/`} exact>
                        <MainMenuNewGame />
                    </Route>

                    <Route>
                        <Redirect to={`/${MENU_PATH}/${NEW_GAME_PATH}/`} />
                    </Route>
                </Switch>
            </Route>

            <Route path={`/${MENU_PATH}/load`} exact>
                <MainMenuLoad />
            </Route>

            <Route path={`/${MENU_PATH}/settings`} exact>
                <MainMenuSettings />
            </Route>

            <Route path={`/${MENU_PATH}/`} exact>
                <MainMenuHome />
            </Route>

            <Route>
                <Redirect to={`/${MENU_PATH}/`} />
            </Route>
        </Switch>
    </div>
);

export default MainMenu;
