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
    LOAD_GAME = 'LOAD_GAME',
    PLAYER_MOVE = 'PLAYER_MOVE'
}

export type GameActions =
    | PlayerMove
    | NewMove
    | StartGame
    | RestartGame
    | LoadGame
    | CellCloning
    | NextMover
    | BlockMoving
    | AllowMoving;

export enum SettingActionType {
    RESET_TO_DEFAULT = 'RESET_TO_DEFAULT',
    SET_SETTING = 'SET_SETTING',
}
export type SettingActions = ResetToDefault | SetSetting;

/**
 * Interfaces of actions
 */
//gameStateReducer and gameFieldReducer
export interface PlayerMove {
    type: GameActionType.PLAYER_MOVE;
    payload: Cell;
}
export interface NewMove {
    type: GameActionType.NEW_MOVE;
    payload: Cell[][];
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
export interface LoadGame {
    type: GameActionType.LOAD_GAME;
    payload: SaveData;
}
export interface StartGame {
    type: GameActionType.START_GAME;
    payload: GameForm;
}

// gameSettingReducer
export interface ResetToDefault {
    type: SettingActionType.RESET_TO_DEFAULT;
    payload: undefined;
}

export interface SetSetting {
    type: SettingActionType.SET_SETTING;
    payload: GameSettings;
}
