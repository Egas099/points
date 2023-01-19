import { isExistPlayerOnField } from '../../../utils/core/predicates/isExistPlayerOnField';

export function startGame(state: GameState, gameForm: GameForm) {
    return {
        ...state,
        moveBlock: false,
        gameStarted: true,
        mover: gameForm.playersProfiles[0].player,
        players: gameForm.playersProfiles
    };
}

export function blockMoving(state: GameState) {
    return { ...state, moveBlock: true };
}

export function nextMove(state: GameState, field: Cell[][]) {
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
