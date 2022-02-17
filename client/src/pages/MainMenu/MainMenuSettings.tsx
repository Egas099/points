import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MainMenu.module.css';

const MainMenuSettings: FC = () => {
    const { goBack } = useHistory();

    return (
        <div className={styles.page__container}>
            <h2>Settings</h2>
            <button className={styles.button} onClick={goBack}>
                Back
            </button>
        </div>
    );
};

export default MainMenuSettings;
