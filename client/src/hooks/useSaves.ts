import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { createSave } from '../utils/create';
import { RootState } from '../store';
import * as actionCreator from '../store/actionCreator';

export function useSaves() {
    const [savesList, setSavesList] = useLocalStorage<Save[]>('saves', []);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!Array.isArray(savesList)) setSavesList([]);
    }, [savesList]);

    return {
        savesList: savesList,
        saveGame: (state: RootState) => {
            const save = createSave(state);
            setSavesList([save, ...savesList]);
        },
        deleteSave: (id: number) =>
            setSavesList(savesList.filter(save => save.date !== id)),
        deleteAllSaves: () => setSavesList([]),
        loadSave: (id: number) => {
            const save = savesList.find(save => save.date === id);
            if (save) {
                dispatch(actionCreator.loadGame(save.state));
                history.push('/single');
            } else {
                console.error('The save requested for loading was not found.');
            }
        }
    };
}
