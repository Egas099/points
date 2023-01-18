import {
    GameActions,
    GameActionType,
    SettingActions,
    SettingActionType
} from './types';

// common
export const loadGame = (payload: SaveData): GameActions => ({
    type: GameActionType.LOAD_GAME,
    payload: payload
});
export const restartGame = (): GameActions => ({
    type: GameActionType.RESTART_GAME,
    payload: undefined
});
export const startGame = (payload: GameForm): GameActions => ({
    type: GameActionType.START_GAME,
    payload: payload
});

// gameFieldReducer
export const cellCloning = (payload: Cell): GameActions => ({
    type: GameActionType.CELL_CLONING,
    payload: payload
});

// gameStateReducer
export const nextMover = (payload: Cell[][]): GameActions => ({
    type: GameActionType.NEXT_MOVER,
    payload: payload
});
export const blockMoving = (): GameActions => ({
    type: GameActionType.BLOCK_MOVING,
    payload: undefined
});
export const allowMoving = (): GameActions => ({
    type: GameActionType.ALLOW_MOVING,
    payload: undefined
});
export const newMove = (payload: Cell[][]): GameActions => ({
    type: GameActionType.NEW_MOVE,
    payload: payload
});
export const playerMove = (payload: Cell): GameActions => ({
    type: GameActionType.PLAYER_MOVE,
    payload: payload
});

// gameSettingReducer
export const resetSettings = (): SettingActions => ({
    type: SettingActionType.RESET_TO_DEFAULT,
    payload: undefined
});
export const setSettings = (payload: GameSettings): SettingActions => ({
    type: SettingActionType.SET_SETTING,
    payload: payload
});
