import { Player } from '../../../data/enums';
import { getCellPositionById } from '../../../utils/core/getCellPositionById';
import { isExistCellAtPosition } from '../../../utils/core/predicates/isExistCellAtPosition';

export function increaseCellAccount(state: Cell[][], cellId: number) {
    if (!state.length) return state;

    const newState = Array.from(state);
    const [x, y] = getCellPositionById(cellId, newState[0].length);

    newState[x][y] = { ...state[x][y], count: newState[x][y].count + 1 };

    return newState;
}

export function cloneCell(state: Cell[][], payload: Cell) {
    if (!state.length) return state;

    const newState = Array.from(state);
    const cell = payload;
    const [x, y] = getCellPositionById(cell.id, newState[0].length);

    if (cell.count === 5) {
        newState[x][y] = { ...newState[x][y], count: 1 };
    } else {
        newState[x][y] = { ...newState[x][y], count: 0, player: null };
    }

    if (isExistCellAtPosition(newState, [x + 1, y]))
        newState[x + 1][y] = cellIncAndCapture(newState[x + 1][y], cell.player);

    if (isExistCellAtPosition(newState, [x, y + 1]))
        newState[x][y + 1] = cellIncAndCapture(newState[x][y + 1], cell.player);

    if (isExistCellAtPosition(newState, [x - 1, y]))
        newState[x - 1][y] = cellIncAndCapture(newState[x - 1][y], cell.player);

    if (isExistCellAtPosition(newState, [x, y - 1]))
        newState[x][y - 1] = cellIncAndCapture(newState[x][y - 1], cell.player);

    return newState;
}

export const cellIncAndCapture = (cell: Cell, player: Player): Cell => {
    return { ...cell, player: player, count: cell.count + 1 };
};
