import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SavesList from '../../../components/SavesList/SavesList';
import { useSaves } from '../../../hooks/useSaves';
import { RootState } from '../../../store';
import * as actionCreator from '../../../store/actionCreator';
import styles from './MainMenuLoad.module.css';

const MainMenuLoad: FC = () => {
    const [savesList, setSavesList] = useState<Save[]>([]);
    const { getSaves, setSaves } = useSaves();
    const { goBack } = useHistory();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(loadSaves, []);

    function loadSaves() {
        setSavesList(getSaves());
    }

    function clearSaves() {
        setSaves([]);
        loadSaves();
    }
    const deleteSave = (id: number) => {
        setSaves(savesList.filter(save => save.date !== id));
        loadSaves();
    };
    function loadGame(state: RootState) {
        dispatch(actionCreator.loadGame(state));
        history.push('/single');
    }

    const savesExist = savesList.length > 0 ? false : true;

    return (
        <div className={styles.page_wrapper}>
            <h2 className={styles.title}>Loading</h2>
            {!savesExist ? (
                <SavesList
                    saves={savesList}
                    deleteSave={deleteSave}
                    loadSave={loadGame}
                />
            ) : (
                <div className={styles.empty}>Empty</div>
            )}
            <div>
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
        </div>
    );
};

export default MainMenuLoad;
