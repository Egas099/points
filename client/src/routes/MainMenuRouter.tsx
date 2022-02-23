import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const MainMenuHome = React.lazy(() => import('../pages/MainMenu/MainMenuHome'));
const MainMenuLoad = React.lazy(() => import('../pages/MainMenu/Loading/MainMenuLoad'));
const MainMenuPlay = React.lazy(() => import('../pages/MainMenu/Play/MainMenuPlay'));
const MainMenuSettings = React.lazy(
    () => import('../pages/MainMenu/Settings/MainMenuSettings')
);

export const PLAY_MENU_PATH = 'play';

const MainMenu: FC = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route
                    path={`${path}${PLAY_MENU_PATH}/*`}
                    component={MainMenuPlayRouter}
                />

                <Route
                    path={`${path}settings`}
                    component={MainMenuSettings}
                    exact
                />

                <Route path={`${path}`} component={MainMenuHome} exact />

                <Route>
                    <Redirect to={`${path}`} />
                </Route>
            </Switch>
        </>
    );
};

const MainMenuPlayRouter: FC = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={`${path}load`} component={MainMenuLoad} />
                <Route path={`${path}`} component={MainMenuPlay} exact />

                <Route>
                    <Redirect to={`${path}`} />
                </Route>
            </Switch>
        </>
    );
};

export default MainMenu;
