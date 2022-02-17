import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { PLAY_MENU_PATH } from '../../routes/MainMenuRouter';
import styles from './MainMenu.module.css';

const MainMenuHome: FC = () => {
    const { url } = useRouteMatch();
    return (
        <div className={styles.page__container}>
            <Link className={styles.button} to={`${url}${PLAY_MENU_PATH}/`}>
                Play
            </Link>
            <Link className={styles.button} to={`${url}settings`}>
                Settings
            </Link>
            <Link className={styles.button} to="/about">
                About
            </Link>
        </div>
    );
};

export default MainMenuHome;
