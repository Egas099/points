import { BotProfile } from '.';
import { RootState } from '../../store';
import { filterCellsByCount, amountEmptyNeighs, randomElemetFrom } from '../aiHelpers';

const simpleBots: BotProfile[] = [
    {
        name: 'a1',
        difficulty: 'simple',
        description: 'Random movement',
        implementation: (state: RootState, ownCells: Cell[]) => {
            return randomElemetFrom(ownCells);
        }
    },
    {
        name: 'a2',
        difficulty: 'simple',
        description: 'Three count priority mover',
        implementation: (state: RootState, ownCells: Cell[]) => {
            const filteredCells = filterCellsByCount(ownCells, 3);

            if (filteredCells.length > 0) {
                return randomElemetFrom(filteredCells);
            } else {
                return randomElemetFrom(ownCells);
            }
        }
    },
    {
        name: 'a3',
        difficulty: 'simple',
        description: 'Expander & three point priority mover',
        implementation: (state: RootState, ownCells: Cell[]) => {
            const filteredCells = filterCellsByCount(ownCells, 3);
            if (filteredCells.length > 0) ownCells = filteredCells;

            for (let i = 4; i > 0; i--) {
                if (
                    ownCells.some(
                        cell => amountEmptyNeighs(state.field, cell) === i
                    )
                ) {
                    ownCells = ownCells.filter(
                        cell => amountEmptyNeighs(state.field, cell) === i
                    );
                    break;
                }
            }

            return randomElemetFrom(ownCells);
        }
    },
    {
        name: 'a4',
        difficulty: 'simple',
        description: 'Accumulator, big Bang',
        implementation: (state: RootState, ownCells: Cell[]) => {
            for (let i = 1; i < 3; i++) {
                const filteredCells = filterCellsByCount(ownCells, i);
                if (filteredCells.length > 0) {
                    return randomElemetFrom(filteredCells);
                }
            }

            return randomElemetFrom(ownCells);
        }
    }
];

export default simpleBots;
