import { RootState } from '../../store';
import {
    amountEmptyNeighs,
    amountEnemyNeighs,
    filterCellsByCount,
    maxNeighsEnemiesCount,
    randomElemetFrom
} from './aiHelpers';

//
export function chooseRandomCellFrom(ownCells: Cell[]): Cell {
    return randomElemetFrom(ownCells);
}

export function chooseMaxCountRandomCellFrom(ownCells: Cell[]): Cell {
    return randomElemetFrom(maxCountCellMove(ownCells));
}

//
export function maxCountCellMove(ownCells: Cell[]) {
    const maxCount = ownCells.reduce(
        (maxCount, cell) => (cell.count > maxCount ? cell.count : maxCount),
        0
    );
    return filterCellsByCount(ownCells, maxCount);
}

export function threePointPriorityMove(ownCells: Cell[]) {
    return filterCellsByCount(ownCells, 3);
}
export function expand(state: RootState, ownCells: Cell[]) {
    let filteredCells = ownCells;

    for (let i = 4; i > 0; i--) {
        filteredCells = ownCells.filter(
            cell => amountEmptyNeighs(state.field, cell) === i
        );
        if (filteredCells.length) {
            break;
        }
    }
    return filteredCells;
}
export function dontPickBattles(state: RootState, ownCells: Cell[]) {
    return ownCells.filter(
        cell => maxNeighsEnemiesCount(state.field, cell) !== 3
    );
}
export function attackThreePointEnemy(state: RootState, ownCells: Cell[]) {
    return ownCells.filter(
        cell => maxNeighsEnemiesCount(state.field, cell) === 3
    );
}

export function attackEnemy(state: RootState, ownCells: Cell[]) {
    return ownCells.filter(cell => amountEnemyNeighs(state.field, cell) > 0);
}

export function accumulate(ownCells: Cell[]) {
    for (let i = 1; i < 3; i++) {
        const filteredCells = filterCellsByCount(ownCells, i);
        if (filteredCells.length > 0) {
            return filteredCells;
        }
    }
    return []
}

