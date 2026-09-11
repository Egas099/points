import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../MainMenu.module.css';

const MainMenuPlay: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page_wrapper}>
            <Link className={styles.button} to="/single">
                Single
            </Link>
            <button className={styles.button} disabled title="In developing">
                Multiplayer
            </button>
            <Link className={styles.button} to="load">
                Loading
            </Link>
            <button className={styles.button} onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default MainMenuPlay;
