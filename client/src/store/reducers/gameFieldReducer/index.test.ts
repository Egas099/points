import { gameFieldReducer } from '.';
import { cellCloning, playerMove } from '../../actionCreator';

const emptyCell = (id: number) => ({
    count: 0,
    exist: true,
    id,
    player: null
});
const clonedCell = (id: number) => ({
    count: 1,
    exist: true,
    id,
    player: 0
});
const nonExistCell = (id: number) => ({
    count: 0,
    exist: false,
    id,
    player: null
});
const mockPayload = { count: 1, exist: true, id: 4, player: 0 };
const mockIncreasedCell = { count: 2, exist: true, id: 4, player: 0 };

const mockInitialState: Cell[][] = [
    [emptyCell(0), emptyCell(1), emptyCell(2)],
    [emptyCell(3), mockPayload, emptyCell(5)],
    [emptyCell(6), emptyCell(7), emptyCell(8)]
];
const mockStateWithIncreasedCellAccount: Cell[][] = [
    [emptyCell(0), emptyCell(1), emptyCell(2)],
    [emptyCell(3), mockIncreasedCell, emptyCell(5)],
    [emptyCell(6), emptyCell(7), emptyCell(8)]
];
const mockStateWithClonedCell: Cell[][] = [
    [emptyCell(0), clonedCell(1), emptyCell(2)],
    [clonedCell(3), emptyCell(4), clonedCell(5)],
    [emptyCell(6), clonedCell(7), emptyCell(8)]
];

const mockInitialStateWithNonExistCells: Cell[][] = [
    [emptyCell(0), nonExistCell(1), emptyCell(2)],
    [emptyCell(3), mockPayload, nonExistCell(5)],
    [emptyCell(6), emptyCell(7), emptyCell(8)]
];
const mockStateWithClonedCellWithNonExistCells: Cell[][] = [
    [emptyCell(0), nonExistCell(1), emptyCell(2)],
    [clonedCell(3), emptyCell(4), nonExistCell(5)],
    [emptyCell(6), clonedCell(7), emptyCell(8)]
];

describe('gameFieldReducer', () => {
    test('increaseCellAccount', () => {
        expect(
            gameFieldReducer(mockInitialState, playerMove(mockPayload))
        ).toEqual(mockStateWithIncreasedCellAccount);
    });

    test('cloneCell', () => {
        expect(
            gameFieldReducer(mockInitialState, cellCloning(mockPayload))
        ).toEqual(mockStateWithClonedCell);
    });

    test('cloneCell with non-exist cells', () => {
        expect(
            gameFieldReducer(
                mockInitialStateWithNonExistCells,
                cellCloning(mockPayload)
            )
        ).toEqual(mockStateWithClonedCellWithNonExistCells);
    });
});
