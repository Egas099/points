import { configureStore } from '@reduxjs/toolkit';
import { gameFieldReducer } from './reducers/gameFieldReducer';
import { gameSettingReducer } from './reducers/gameSettingReducer';
import { gameStateReducer } from './reducers/gameStateReducer';

export const store = configureStore({
    reducer: {
        field: gameFieldReducer,
        gameState: gameStateReducer,
        settings: gameSettingReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
