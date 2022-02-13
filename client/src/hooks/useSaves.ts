import { APP_VERSION } from '../data/constants';
import { RootState } from '../store';

export function useSaves() {
    return {
        save: (state: RootState) => {
            let saves = JSON.parse(localStorage.getItem('saves') || '[]');
            if (Array.isArray(saves)) {
                saves.pop();
                saves.push(createSave(state));
            } else {
                saves = [createSave(state)];
            }
            localStorage.setItem('saves', JSON.stringify(saves));
        },
        load: (id = 0) => {
            const save: Save =
                JSON.parse(localStorage.getItem('saves') || '[]')[id] || [];
            return save;
        },
        getSaves: () => JSON.parse(localStorage.getItem('saves') || '[]'),
        setSaves: (saves: Save[]) =>
            localStorage.setItem('saves', JSON.stringify(saves))
    };
}

const createSave = (state: RootState): Save => ({
    date: Date.now(),
    appVersion: APP_VERSION,
    state: state
});
