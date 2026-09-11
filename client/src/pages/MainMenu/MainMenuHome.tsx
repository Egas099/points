import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PLAY_MENU_PATH } from '../../routes/MainMenuRouter';
import styles from './MainMenu.module.css';

const MainMenuHome: FC = () => {
    return (
        <div className={styles.page_wrapper}>
            <Link className={styles.button} to={`${PLAY_MENU_PATH}/`}>
                Play
            </Link>
            <Link className={styles.button} to="settings">
                Settings
            </Link>
            <Link className={styles.button} to="/about">
                About
            </Link>
        </div>
    );
};

export default MainMenuHome;
