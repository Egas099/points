import { defaultState, gameStateReducer } from '.';
import { PlayerEntity } from '../../../data/enums';
import {
    loadGame,
    newMove,
    playerMove,
    restartGame,
    startGame
} from '../../actionCreator';

const mockInitialState: GameState = {
    gameStarted: false,
    moveBlock: true,
    endGame: false,
    mover: 0,
    moveNumber: 0,
    players: []
};
const localProfile = (id: number) => ({
    entity: { id: `${id}`, playerEntity: PlayerEntity.localPlayer },
    player: id
});
const mockGameForm: GameForm = {
    templateId: 0,
    playersProfiles: [localProfile(1), localProfile(2), localProfile(3)]
};
const mockStartedState: GameState = {
    gameStarted: true,
    moveBlock: false,
    endGame: false,
    mover: 1,
    moveNumber: 0,
    players: mockGameForm.playersProfiles
};

describe('gameStateReducer', () => {
    test('Starting the game', () => {
        const action = startGame(mockGameForm);
        expect(gameStateReducer(mockInitialState, action)).toEqual(
            mockStartedState
        );
    });
    test('Game loading', () => {
        const action = loadGame({
            gameState: mockStartedState,
            field: []
        });
        expect(gameStateReducer(mockInitialState, action)).toEqual(
            mockStartedState
        );
    });
    test('Game loading', () => {
        expect(gameStateReducer(mockInitialState, restartGame())).toEqual(
            defaultState()
        );
    });
});
const mockStateWithMoveBlock: GameState = {
    gameStarted: true,
    moveBlock: true,
    endGame: false,
    mover: 1,
    moveNumber: 0,
    players: mockGameForm.playersProfiles
};

describe('gameStateReducer', () => {
    test('Block move', () => {
        const action = playerMove({ count: 1, exist: true, id: 0, player: 1 });
        expect(gameStateReducer(mockStartedState, action)).toEqual(
            mockStateWithMoveBlock
        );
    });
});

const emptyCell = (id: number) => ({
    count: 0,
    exist: true,
    id,
    player: null
});
const cellWithPlayer = (id: number, player: number) => ({
    count: 3,
    exist: true,
    id,
    player: player
});
const mockField: Cell[][] = [
    [cellWithPlayer(0, 1), emptyCell(1), emptyCell(2)],
    [emptyCell(3), cellWithPlayer(0, 2), emptyCell(5)],
    [emptyCell(6), emptyCell(7), cellWithPlayer(0, 3)]
];
const mockNextMoveInitialState = {
    gameStarted: true,
    moveBlock: true,
    endGame: false,
    mover: 1,
    moveNumber: 5,
    players: mockGameForm.playersProfiles
};
const mockNextMoveState = {
    gameStarted: true,
    moveBlock: false,
    endGame: false,
    mover: 2,
    moveNumber: 6,
    players: mockGameForm.playersProfiles
};

const mockFieldWithoutEliminatedPlayer: Cell[][] = [
    [cellWithPlayer(0, 1), emptyCell(1), emptyCell(2)],
    [emptyCell(3), emptyCell(4), emptyCell(5)],
    [emptyCell(6), emptyCell(7), cellWithPlayer(0, 3)]
];
const mockNextMoveStateWithoutEliminatedPlayer = {
    gameStarted: true,
    moveBlock: false,
    endGame: false,
    mover: 3,
    moveNumber: 6,
    players: [mockGameForm.playersProfiles[0], mockGameForm.playersProfiles[2]]
};

describe('gameStateReducer', () => {
    test('Next move', () => {
        const action = newMove(mockField);
        expect(gameStateReducer(mockNextMoveInitialState, action)).toEqual(
            mockNextMoveState
        );
    });

    test('Next move with an eliminated player', () => {
        const action = newMove(mockFieldWithoutEliminatedPlayer);
        expect(gameStateReducer(mockNextMoveInitialState, action)).toEqual(
            mockNextMoveStateWithoutEliminatedPlayer
        );
    });
});
