import { assembleField } from '../../../utils/core/constructors/assembleField';
import { GameActions, GameActionType } from '../../types';
import { increaseCellAccount, cloneCell } from './cases';

const defaultState = (): Cell[][] => [];

export const gameFieldReducer = (
    state = defaultState(),
    action: GameActions
): Cell[][] => {
    switch (action.type) {
        case GameActionType.START_GAME:
            return action.payload
                ? assembleField(action.payload)
                : defaultState();
        case GameActionType.CELL_CLONING:
            return cloneCell(state, action.payload);
        case GameActionType.PLAYER_MOVE:
            return increaseCellAccount(state, action.payload.id);
        case GameActionType.RESTART_GAME:
            return defaultState();
        case GameActionType.LOAD_GAME:
            return action.payload.field;
        default:
            return state;
    }
};
