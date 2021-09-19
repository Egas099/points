import { Player } from '../../types';

export enum GameActionType {
    CELL_CAPTURE = 'CELL_CAPTURE',
    CELL_INCREMENT = 'CELL_INCREMENT',
    CELL_ZEROING = 'CELL_ZEROING',
    BLOCK_MOVING = 'BLOCK_MOVING',
    ALLOW_MOVING = 'ALLOW_MOVING',
    NEXT_MOVER = 'NEXT_MOVER',
    RESTART_GAME = 'RESTART_GAME',
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

export interface BlockMoving {
    type: GameActionType.BLOCK_MOVING;
    payload: undefined;
}

export interface AllowMoving {
    type: GameActionType.ALLOW_MOVING;
    payload: undefined;
}
export interface NextMover {
    type: GameActionType.NEXT_MOVER;
    payload: Cell[][];
}
export interface RestartGame {
    type: GameActionType.RESTART_GAME;
    payload: undefined;
}

export type GameActions = CellZeroing
    | RestartGame
    | CellIncrement
    | NextMover
    | CellCapture
    | BlockMoving
    | AllowMoving;

export interface playerMoving {
    cellId: number;
    player: Player;
}