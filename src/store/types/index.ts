import { Player } from '../../types';

export enum GameActionType {
    CELL_CAPTURE = 'CELL_CAPTURE',
    CELL_INCREMENT = 'CELL_INCREMENT',
    CELL_ZEROING = 'CELL_ZEROING',
    NEXT_MOVER = 'NEXT_MOVER',
    RESTART_GAME = 'RESTART_GAME',
    CHANGE_TITLE = 'CHANGE_TITLE',
}

/**
 * Interfaces of actions
 */

export interface CellCapture {
    type: GameActionType.CELL_CAPTURE;
    payload: playerMoving;
}
export interface CellIncrement {
    type: GameActionType.CELL_INCREMENT;
    payload: number;
}
export interface CellZeroing {
    type: GameActionType.CELL_ZEROING;
    payload: number;
}
export interface NextMover {
    type: GameActionType.NEXT_MOVER;
    payload: undefined;
}
export interface RestartGame {
    type: GameActionType.RESTART_GAME;
    payload: undefined;
}

export interface ChangeTitle {
    type: GameActionType.CHANGE_TITLE;
    payload: string;
}

export type GameActions = CellZeroing
    | RestartGame
    | ChangeTitle
    | CellIncrement
    | NextMover
    | CellCapture;

export interface playerMoving {
    cellId: number;
    player: Player;
}