import { RootState } from "../../store";
import { calc, filter, find, random } from "../functions";

/**
 * Priority for capturing enemy cells with three dots, if they are next to their own cells with three dots.
 */
export const b1 = (state: RootState) => {
    const cells = find.cellsByPlayer(state.field, state.gameState.mover)

    let filteredCells = filter.cellsByCount(cells, 3);
    filteredCells = filteredCells.filter((cell) => calc.maxNeighsEnemiesCount(state.field, cell) === 3 ? true : false)

    if (filteredCells.length > 0) {
        return random.elemetFrom(filteredCells);
    }

    return random.elemetFrom(cells);
}

/**
 * 
 */
export const b2 = (state: RootState) => {
    const cells = find.cellsByPlayer(state.field, state.gameState.mover)

    let filteredCells = filter.cellsByCount(cells, 3);
    filteredCells = filteredCells.filter((cell) => calc.maxNeighsEnemiesCount(state.field, cell) === 3 ? 1 : 0)

    if (filteredCells.length > 0) {
        return random.elemetFrom(filteredCells);
    }

    filteredCells = filter.cellsByCount(cells, 3);

    if (filteredCells.length > 0) {
        return random.elemetFrom(filteredCells);
    } else {
        return random.elemetFrom(cells);;
    }
}