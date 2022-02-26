import { FC } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import styles from '../MainMenu.module.css';

const MainMenuPlay: FC = () => {
    const { goBack } = useHistory();
    const { url } = useRouteMatch();

    return (
        <div className={styles.page_wrapper}>
            <Link className={styles.button} to="/single">
                Single
            </Link>
            <button className={styles.button} disabled title="In developing">
                Multiplayer
            </button>
            <Link className={styles.button} to={`${url}load`}>
                Loading
            </Link>
            <button className={styles.button} onClick={goBack}>
                Back
            </button>
        </div>
    );
};

export default MainMenuPlay;
