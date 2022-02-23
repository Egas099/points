import { BotProfile } from '.';
import { RootState } from '../../store';
import {
    filterCellsByCount,
    maxNeighsEnemiesCount,
    randomElemetFrom
} from '../aiHelpers';

const normalBots: BotProfile[] = [
    {
        name: 'b1',
        difficulty: 'normal',
        description:
            'Priority for capturing enemy cells with three dots, if they are next to their own cells with three dots.',
        implementation: (state: RootState, ownCells: Cell[]): Cell => {
            let filteredCells = filterCellsByCount(ownCells, 3);
            filteredCells = filteredCells.filter(cell =>
                maxNeighsEnemiesCount(state.field, cell) === 3 ? true : false
            );

            if (filteredCells.length > 0) {
                return randomElemetFrom(filteredCells);
            }

            return randomElemetFrom(ownCells);
        }
    },
    {
        name: 'b2',
        difficulty: 'normal',
        description: '',
        implementation: (state: RootState, ownCells: Cell[]) => {
            let filteredCells = filterCellsByCount(ownCells, 3);
            filteredCells = filteredCells.filter(cell =>
                maxNeighsEnemiesCount(state.field, cell) === 3 ? 1 : 0
            );

            if (filteredCells.length > 0) {
                return randomElemetFrom(filteredCells);
            }

            filteredCells = filterCellsByCount(ownCells, 3);

            if (filteredCells.length > 0) {
                return randomElemetFrom(filteredCells);
            } else {
                return randomElemetFrom(ownCells);
            }
        }
    }
];

export default normalBots;
