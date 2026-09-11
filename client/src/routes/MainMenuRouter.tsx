import { FC, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainMenuHome = lazy(() => import('../pages/MainMenu/MainMenuHome'));
const MainMenuLoad = lazy(
    () => import('../pages/MainMenu/Loading/MainMenuLoad')
);
const MainMenuPlay = lazy(() => import('../pages/MainMenu/Play/MainMenuPlay'));
const MainMenuSettings = lazy(
    () => import('../pages/MainMenu/Settings/MainMenuSettings')
);

export const PLAY_MENU_PATH = 'play';

const MainMenu: FC = () => {
    return (
        <Routes>
            <Route
                path={`${PLAY_MENU_PATH}/*`}
                element={<MainMenuPlayRouter />}
            />
            <Route path="settings" element={<MainMenuSettings />} />
            <Route index element={<MainMenuHome />} />
            <Route path="*" element={<Navigate to="/menu" replace />} />
        </Routes>
    );
};

const MainMenuPlayRouter: FC = () => {
    return (
        <Routes>
            <Route path="load" element={<MainMenuLoad />} />
            <Route index element={<MainMenuPlay />} />
            <Route path="*" element={<Navigate to="/menu/play" replace />} />
        </Routes>
    );
};

export default MainMenu;
