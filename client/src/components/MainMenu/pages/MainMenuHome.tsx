import { FC } from 'react';
import { Link } from 'react-router-dom';
import { NEW_GAME_PATH } from '../constants';

const MainMenuHome: FC = () => {
    return (
        <div>
            <Link className="menu__btn" to={`${NEW_GAME_PATH}/`}>
                Play
            </Link>
            <Link className="menu__btn" to="settings">
                Settings
            </Link>
            <Link className="menu__btn" to="/about">
                About
            </Link>
        </div>
    );
};

export default MainMenuHome;
