import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import SavesList from '../../../components/SavesList/SavesList';
import { useSaves } from '../../../hooks/useSaves';
import styles from './MainMenuLoad.module.css';

const MainMenuLoad: FC = () => {
    const { savesList, loadSave, deleteSave, deleteAllSaves } = useSaves();
    const navigate = useNavigate();

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
                <button className={styles.button} onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default MainMenuLoad;
