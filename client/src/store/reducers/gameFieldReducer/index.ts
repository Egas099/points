import type { Action } from '@reduxjs/toolkit';
import { assembleField } from '../../../utils/core/constructors/assembleField';
import { GameActions, GameActionType } from '../../types';
import { increaseCellAccount, cloneCell } from './cases';

const defaultState = (): Cell[][] => [];

export const gameFieldReducer = (
    state = defaultState(),
    action: Action
): Cell[][] => {
    const gameAction = action as GameActions;
    switch (gameAction.type) {
        case GameActionType.START_GAME:
            return gameAction.payload
                ? assembleField(gameAction.payload)
                : defaultState();
        case GameActionType.CELL_CLONING:
            return cloneCell(state, gameAction.payload);
        case GameActionType.PLAYER_MOVE:
            return increaseCellAccount(state, gameAction.payload.id);
        case GameActionType.RESTART_GAME:
            return defaultState();
        case GameActionType.LOAD_GAME:
            return gameAction.payload.field;
        default:
            return state;
    }
};
