import { GameActions, GameActionType, playerMoving } from "./types";

export const cellIncrement = (payload: number): GameActions => ({ type: GameActionType.CELL_INCREMENT, payload: payload });
export const cellZeroing = (payload: number): GameActions => ({ type: GameActionType.CELL_ZEROING, payload: payload });
export const cellCapture = (payload: playerMoving): GameActions => ({ type: GameActionType.CELL_CAPTURE, payload: payload });

export const nextMover = (payload: Cell[][]): GameActions => ({ type: GameActionType.NEXT_MOVER, payload: payload });
export const blockMoving = (): GameActions => ({ type: GameActionType.BLOCK_MOVING, payload: undefined });
export const allowMoving = (): GameActions => ({ type: GameActionType.ALLOW_MOVING, payload: undefined });

export const restartGame = (): GameActions => ({ type: GameActionType.RESTART_GAME, payload: undefined });
