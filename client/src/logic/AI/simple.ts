import { BotProfile } from ".";
import { RootState } from "../../store";
import { amountEmptyNeighs } from "../calculate";
import { filter, find, random } from "../common";

const simpleBots: BotProfile[] = [
    {
        name: "a1",
        difficulty: 'simple',
        description: "Random movement",
        implementation: (state: RootState) => {
            const cells = find.cellsByPlayer(state.field, state.gameState.mover)

            return random.elemetFrom(cells);
        }
    },
    {
        name: "a2",
        difficulty: 'simple',
        description: "Three count priority mover",
        implementation: (state: RootState) => {
            const cells = find.cellsByPlayer(state.field, state.gameState.mover)
            const filteredCells = filter.cellsByCount(cells, 3);

            if (filteredCells.length > 0) {
                return random.elemetFrom(filteredCells);
            } else {
                return random.elemetFrom(cells);;
            }
        }
    },
    {
        name: "a3",
        difficulty: 'simple',
        description: "Expander & three point priority mover",
        implementation: (state: RootState) => {
            let cells = find.cellsByPlayer(state.field, state.gameState.mover)
            const filteredCells = filter.cellsByCount(cells, 3);
            if (filteredCells.length > 0)
                cells = filteredCells;

            for (let i = 4; i > 0; i--) {
                if (cells.some(cell => amountEmptyNeighs(state.field, cell) === i)) {
                    cells = cells.filter((cell) => amountEmptyNeighs(state.field, cell) === i);
                    break;
                }
            }

            return random.elemetFrom(cells);
        }
    },
    {
        name: "a4",
        difficulty: 'simple',
        description: "Accumulator, big Bang",
        implementation: (state: RootState) => {
            const cells = find.cellsByPlayer(state.field, state.gameState.mover)

            for (let i = 1; i < 3; i++) {
                const filteredCells = filter.cellsByCount(cells, i);
                if (filteredCells.length > 0) {
                    return random.elemetFrom(filteredCells);
                }
            }

            return random.elemetFrom(cells);
        }
    }
]

export default simpleBots;
