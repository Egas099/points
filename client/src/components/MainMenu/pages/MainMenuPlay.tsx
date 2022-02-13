import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MENU_PATH, NEW_GAME_PATH } from '../constants';

const MainMenuPlay: FC = () => {
    return (
        <div>
            <Link className="menu__btn" to="/single">
                Single
            </Link>
            <Link className="menu__btn" to={`/${MENU_PATH}/${NEW_GAME_PATH}/load`}>
                Load
            </Link>
            {/* <Link className="menu__btn" to="/multiplayer">
                Multiplayer
            </Link> */}
            <Link className="menu__btn" to="/menu/">
                Back
            </Link>
        </div>
    );
};

export default MainMenuPlay;
