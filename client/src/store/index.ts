import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { gameFieldReducer } from './reducers/gameFieldReducer';
import { gameStateReducer } from './reducers/gameStateReducer';

const rootReducer = combineReducers({
    field: gameFieldReducer,
    gameState: gameStateReducer
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;
