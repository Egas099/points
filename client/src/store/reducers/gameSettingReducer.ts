import { BOT_MOVING_DELAY, CELL_CLONING_DELAY } from '../../data/constants';
import { webStorage } from '../../utils/adapters/webStorage';
import { createGameSettings } from '../../utils/core/constructors/createGameSettings';
import { SettingActions, SettingActionType } from '../types';

export const defaultSettings = createGameSettings(
    BOT_MOVING_DELAY,
    CELL_CLONING_DELAY
);

const settings = webStorage.getItem('settings', defaultSettings);
function setSettings(state: GameSettings) {
    webStorage.setItem('settings', state);
}

export const gameSettingReducer = (
    state = validateSettings(settings) ? settings : defaultSettings,
    action: SettingActions
): GameSettings => {
    let newState = state;
    switch (action.type) {
        case SettingActionType.RESET_TO_DEFAULT:
            newState = defaultSettings;
            break;
        case SettingActionType.SET_SETTING:
            newState = action.payload;
            break;
    }
    setSettings(newState);
    return newState;
};

function validateSettings(settings: GameSettings) {
    return (
        typeof settings === 'object' &&
        !Array.isArray(settings) &&
        settings !== null &&
        Object.prototype.hasOwnProperty.call(settings, 'botMovingDelay') &&
        Object.prototype.hasOwnProperty.call(settings, 'cellCloningDelay')
    );
}
