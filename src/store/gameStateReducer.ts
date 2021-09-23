import { isExist } from '../logic/functions';
import { Player, States } from '../types';
import { GameActions, GameActionType } from './types';

const defaultState = (): GameState => ({
    mover: Player.red,
    moveBlock: false,
    players: getPlayers(),
    moveNumber: 0,
    state: States.Moving
})


const getPlayers = () => [
    Player.red,
    Player.orange,
    Player.yellow,
    Player.green,
    Player.blue
]

export const gameStateReducer = (state = defaultState(), action: GameActions): GameState => {
    switch (action.type) {
        case GameActionType.BLOCK_MOVING:
            return { ...state, moveBlock: true };
        case GameActionType.ALLOW_MOVING:
            return { ...state, moveBlock: false };
        case GameActionType.NEXT_MOVER:
            return actionNextMover(state, action.payload);
        case GameActionType.RESTART_GAME:
            return defaultState();
        default:
            return state;
    }
};

function actionNextMover(state: GameState, field: Cell[][]) {
    const leftPlayers = [...state.players].filter((player) => isExist.playerOnField(field, player));

    const currentMoverIndex = leftPlayers.indexOf(state.mover);
    const nextMoverIndex = currentMoverIndex + 1 < leftPlayers.length ? currentMoverIndex + 1 : 0;
    let newMover = leftPlayers[nextMoverIndex];

    if (state.mover === leftPlayers[nextMoverIndex]) {
        console.log(`${Player[leftPlayers[nextMoverIndex]]} vin`);
        newMover = 256;
    }
    return { ...state, mover: newMover, players: leftPlayers };
}