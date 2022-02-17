import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SavesList from '../../components/MainMenu/components/SavesList';
import { useSaves } from '../../hooks/useSaves';
import styles from './MainMenu.module.css';

const MainMenuLoad: FC = () => {
    const [savesList, setSavesList] = useState([]);
    const { getSaves, setSaves } = useSaves();
    const { goBack } = useHistory();

    useEffect(loadSaves, []);

    function loadSaves() {
        setSavesList(getSaves());
    }

    function clearSaves() {
        setSaves([]);
        loadSaves();
    }
    const savesExist =
        Array.isArray(savesList) && savesList.length > 0 ? false : true;

    return (
        <div className={styles.page__container}>
            <h2>Loading</h2>
            <SavesList saves={savesList} />
            <button
                className={styles.button}
                onClick={clearSaves}
                disabled={savesExist}
            >
                Clear all
            </button>
            <button className={styles.button} onClick={goBack}>
                Back
            </button>
        </div>
    );
};

export default MainMenuLoad;
