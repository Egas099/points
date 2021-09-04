export type Cell = {
    id: number;
    count: number;
}

interface GameState {
    field: Cell[][]
}

export enum GameActionType {
    PLAYER_MOVE = 'PLAYER_MOVE',
    CELL_ZEROING = 'CELL_ZEROING',
    RESTART_GAME = 'RESTART_GAME',
    CHANGE_TITLE = 'CHANGE_TITLE',
}

export interface PlayerMove {
    type: GameActionType.PLAYER_MOVE;
    payload: number;
}
export interface CellZeroing {
    type: GameActionType.CELL_ZEROING;
    payload: number;
}

export interface RestartGame {
    type: GameActionType.RESTART_GAME;
    payload: undefined;
}

export interface ChangeTitle {
    type: GameActionType.CHANGE_TITLE;
    payload: string;
}

export type GameActions = PlayerMove | CellZeroing | RestartGame | ChangeTitle;

const createField = (): Cell[][] => {
    return new Array(10).fill(1).map((a, i) => {
        return (new Array(10).fill(1).map((b, j) => createCell(i * 10 + j)))
    })
}
const createCell = (id: number) => ({ id: id, count: 0 })

const defaultState = (): GameState => ({
    field: createField(),
})

export const calcPosition = (number: number) => {
    return [number % 10, Math.floor(number / 10)]
}

export const gameReducer = (state = defaultState(), action: GameActions) => {
    switch (action.type) {
        case GameActionType.PLAYER_MOVE:
            return actionPlayerMove(state, action);
        case GameActionType.CELL_ZEROING:
            return actionCellZeroing(state, action);
        case GameActionType.RESTART_GAME:
            return defaultState();
        default:
            return state;
    }
};

export const playerMove = (payload: number): GameActions => ({ type: GameActionType.PLAYER_MOVE, payload: payload })
export const cellZeroing = (payload: number): GameActions => ({ type: GameActionType.CELL_ZEROING, payload: payload })
export const restartGame = (): GameActions => ({ type: GameActionType.RESTART_GAME, payload: undefined })

function actionPlayerMove(state: GameState, action: PlayerMove) {
    let newState = { ...state };
    const [x, y] = calcPosition(action.payload);

    newState.field[y][x].count += 1;

    return newState;
}
function actionCellZeroing(state: GameState, action: CellZeroing) {
    let newState = { ...state };
    const [x, y] = calcPosition(action.payload);

    newState.field[y][x].count = 0;

    return newState;
}