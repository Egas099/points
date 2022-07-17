import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import SavesList from '../../../components/SavesList/SavesList';
import { useSaves } from '../../../hooks/useSaves';
import styles from './MainMenuLoad.module.css';

const MainMenuLoad: FC = () => {
    const { savesList, loadSave, deleteSave, deleteAllSaves } = useSaves();
    const { goBack } = useHistory();

    const savesExist = savesList.length > 0 ? true : false;

    return (
        <div className={styles.page_wrapper}>
            <h2 className={styles.title}>Loading</h2>
            {savesExist ? (
                <SavesList
                    saves={savesList}
                    deleteSave={deleteSave}
                    loadSave={loadSave}
                />
            ) : (
                <div className={styles.empty}>Empty</div>
            )}
            <div>
                <button
                    className={styles.button}
                    onClick={deleteAllSaves}
                    disabled={!savesExist}
                >
                    Clear all
                </button>
                <button className={styles.button} onClick={goBack}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default MainMenuLoad;
