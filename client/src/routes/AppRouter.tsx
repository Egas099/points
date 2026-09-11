import { FC, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const About = lazy(() => import('../pages/About/About'));
const Game = lazy(() => import('../pages/GamePlay/Game'));
const MainMenuRouter = lazy(() => import('./MainMenuRouter'));

export const MENU_PATH = 'menu';

const AppRouter: FC = () => {
    return (
        <BrowserRouter basename="/points">
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/single" element={<Game />} />
                <Route path="/multiplayer" element={<Game />} />
                <Route path={`/${MENU_PATH}/*`} element={<MainMenuRouter />} />
                <Route
                    path="*"
                    element={<Navigate to={`/${MENU_PATH}`} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
