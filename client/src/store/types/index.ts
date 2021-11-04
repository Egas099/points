import { Player } from '../../types';

export enum GameActionType {
    CELL_CAPTURE = 'CELL_CAPTURE',
    CELL_INCREMENT = 'CELL_INCREMENT',
    CELL_ZEROING = 'CELL_ZEROING',
    CELL_CLONING = 'CELL_CLONING',
    NEW_MOVE = 'NEW_MOVE',
    BLOCK_MOVING = 'BLOCK_MOVING',
    ALLOW_MOVING = 'ALLOW_MOVING',
    NEXT_MOVER = 'NEXT_MOVER',
    START_GAME = 'START_GAME',
    RESTART_GAME = 'RESTART_GAME',
    PLAYER_MOVE = 'PLAYER_MOVE',
}

/**
 * Interfaces of actions
 */
export interface PlayerMove {
    type: GameActionType.PLAYER_MOVE;
    payload: Cell;
}
export interface NewMove {
    type: GameActionType.NEW_MOVE;
    payload: Cell[][];
}

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

export interface CellCloning {
    type: GameActionType.CELL_CLONING;
    payload: Cell;
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
export interface StartGame {
    type: GameActionType.START_GAME;
    payload: FieldTemplate;
}
export type GameActions = CellZeroing
    | PlayerMove
    | NewMove
    | StartGame
    | RestartGame
    | CellIncrement
    | CellCapture
    | CellCloning
    | NextMover
    | BlockMoving
    | AllowMoving;

export interface playerMoving {
    cellId: number;
    player: Player;
}