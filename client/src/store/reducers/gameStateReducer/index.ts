import type { Action } from '@reduxjs/toolkit';
import { GameActions, GameActionType } from '../../types';
import { startGame, nextMove, blockMoving } from './cases';

export const defaultState = (): GameState => ({
    gameStarted: false,
    moveBlock: true,
    endGame: false,
    mover: 0,
    moveNumber: 0,
    players: []
});

export const gameStateReducer = (
    state = defaultState(),
    action: Action
): GameState => {
    const gameAction = action as GameActions;
    switch (gameAction.type) {
        case GameActionType.START_GAME:
            return startGame(state, gameAction.payload);
        case GameActionType.NEXT_MOVE:
            return nextMove(state, gameAction.payload);
        case GameActionType.PLAYER_MOVE:
            return blockMoving(state);
        case GameActionType.RESTART_GAME:
            return defaultState();
        case GameActionType.LOAD_GAME:
            return gameAction.payload.gameState;
        default:
            return state;
    }
};
