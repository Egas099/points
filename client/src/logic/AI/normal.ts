import { BotProfile } from ".";
import { RootState } from "../../store";
import { maxNeighsEnemiesCount } from "../calculate";
import { filter, find, random } from "../common";

const normalBots: BotProfile[] = [
    {
        name: "b1",
        difficulty: 'normal',
        description: "Priority for capturing enemy cells with three dots, if they are next to their own cells with three dots.",
        implementation: (state: RootState) => {
            const cells = find.cellsByPlayer(state.field, state.gameState.mover)

            let filteredCells = filter.cellsByCount(cells, 3);
            filteredCells = filteredCells.filter((cell) => maxNeighsEnemiesCount(state.field, cell) === 3 ? true : false)

            if (filteredCells.length > 0) {
                return random.elemetFrom(filteredCells);
            }

            return random.elemetFrom(cells);
        }
    },
    {
        name: "b2",
        difficulty: 'normal',
        description: "",
        implementation: (state: RootState) => {
            const cells = find.cellsByPlayer(state.field, state.gameState.mover)

            let filteredCells = filter.cellsByCount(cells, 3);
            filteredCells = filteredCells.filter((cell) => maxNeighsEnemiesCount(state.field, cell) === 3 ? 1 : 0)

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
    }
]

export default normalBots;
