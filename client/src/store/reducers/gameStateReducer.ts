import { isExistPlayerOnField } from '../../utils/core/predicates/isExistPlayerOnField';
import { GameActions, GameActionType } from '../types';

const defaultState = (): GameState => ({
    gameStarted: false,
    moveBlock: true,
    endGame: false,
    mover: 0,
    moveNumber: 0,
    players: []
});

export const gameStateReducer = (
    state = defaultState(),
    action: GameActions
): GameState => {
    switch (action.type) {
        case GameActionType.BLOCK_MOVING:
            return { ...state, moveBlock: true };
        case GameActionType.ALLOW_MOVING:
            return {
                ...state,
                moveBlock: false,
                moveNumber: state.moveNumber + 1
            };
        case GameActionType.NEW_MOVE:
            return actionNewMove(state, action.payload);
        case GameActionType.NEXT_MOVER:
            return nextMover(state, action.payload);
        case GameActionType.PLAYER_MOVE:
            return { ...state, moveBlock: true };
        case GameActionType.START_GAME:
            return actionStartGame(state, action.payload);
        case GameActionType.RESTART_GAME:
            return defaultState();
        case GameActionType.LOAD_GAME:
            return action.payload.gameState;
        default:
            return state;
    }
};

function actionNewMove(state: GameState, field: Cell[][]) {
    if (state.moveBlock && state.gameStarted && !state.endGame) {
        const newState = {
            ...nextMover(state, field),
            moveNumber: state.moveNumber + 1,
            moveBlock: false
        };
        if (newState.players.length === 1) {
            newState.endGame = true;
            newState.moveBlock = true;
        }
        return newState;
    } else {
        return state;
    }
}
function actionStartGame(state: GameState, gameForm: GameForm) {
    return {
        ...state,
        moveBlock: false,
        gameStarted: true,
        mover: gameForm.playersProfiles[0].player,
        players: gameForm.playersProfiles
    };
}

function nextMover(state: GameState, field: Cell[][]) {
    const leftPlayers = state.players.filter(profile =>
        isExistPlayerOnField(field, profile.player)
    );
    const currentMoverIndex = state.players.findIndex(
        profile => profile.player === state.mover
    );

    const nextMoverIndex =
        currentMoverIndex + 1 < leftPlayers.length ? currentMoverIndex + 1 : 0;
    const newMover = leftPlayers[nextMoverIndex].player;
    return { ...state, mover: newMover, players: leftPlayers };
}
