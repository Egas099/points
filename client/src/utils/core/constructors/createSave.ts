import { APP_VERSION } from "../../../data/constants";
import { RootState } from "../../../store";

export const createSave = (state: RootState): Save => ({
    date: Date.now(),
    appVersion: APP_VERSION,
    state: {
        field: state.field,
        gameState: state.gameState
    }
});