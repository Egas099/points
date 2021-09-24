import { RootState } from "../../store";
import { calc, filter, find, random } from "../functions";

/**
 * Random movement
 */
export const c1 = (state: RootState) => {
    const cells = find.cellsByPlayer(state.field.field, state.gameState.mover)

    return random.elemetFrom(cells);
}

/**
 * Accumulator, big Bang
 */
export const c2 = (state: RootState) => {
    const cells = find.cellsByPlayer(state.field.field, state.gameState.mover)

    for (let i = 1; i < 3; i++) {
        const filteredCells = filter.cellsByCount(cells, i);
        if (filteredCells.length > 0) {
            return random.elemetFrom(filteredCells);
        }
    }

    return random.elemetFrom(cells);
}

/**
 * Three count priority mover
 */
export const c3 = (state: RootState) => {
    const cells = find.cellsByPlayer(state.field.field, state.gameState.mover)
    const filteredCells = filter.cellsByCount(cells, 3);

    if (filteredCells.length > 0) {
        return random.elemetFrom(filteredCells);
    } else {
        return random.elemetFrom(cells);;
    }
}

/**
 * Expander & three count priority mover
 */
export const c4 = (state: RootState) => {
    let cells = find.cellsByPlayer(state.field.field, state.gameState.mover)
    const filteredCells = filter.cellsByCount(cells, 3);
    if (filteredCells.length > 0)
        cells = filteredCells;

    for (let i = 4; i > 0; i--) {
        if (cells.some(cell => calc.amountEmptyNeighs(state.field.field, cell) === i)) {
            cells = cells.filter((cell) => calc.amountEmptyNeighs(state.field.field, cell) === i);
            break;
        }
    }

    return random.elemetFrom(cells);
}