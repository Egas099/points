import { BotProfile } from '.';
import { RootState } from '../../store';
import {
    accumulate,
    chooseRandomCellFrom,
    expand,
    threePointPriorityMove
} from './aiBehavior';

const simpleBots: BotProfile[] = [
    {
        name: 'a1',
        difficulty: 'simple',
        description: 'Random movement',
        implementation: (state: RootState, ownCells: Cell[]) => {
            return chooseRandomCellFrom(ownCells);
        }
    },
    {
        name: 'a2',
        difficulty: 'simple',
        description: 'Three count priority mover',
        implementation: (state: RootState, ownCells: Cell[]) => {
            const threePoint = threePointPriorityMove(ownCells);

            if (threePoint.length > 0) {
                return chooseRandomCellFrom(threePoint);
            }
        }
    },
    {
        name: 'a3',
        difficulty: 'simple',
        description: 'Expander & three point priority mover',
        implementation: (state: RootState, ownCells: Cell[]) => {
            const threePoint = threePointPriorityMove(ownCells);

            if (threePoint.length > 0) {
                return chooseRandomCellFrom(threePoint);
            }
            const canExpand = expand(state, ownCells);
            if (canExpand.length) {
                return chooseRandomCellFrom(canExpand);
            }

            return chooseRandomCellFrom(ownCells);
        }
    },
    {
        name: 'a4',
        difficulty: 'simple',
        description: 'Accumulator, big Bang',
        implementation: (state: RootState, ownCells: Cell[]) => {
            const canAccumulate = accumulate(ownCells);
            if (canAccumulate.length) {
                return chooseRandomCellFrom(canAccumulate);
            }
            return chooseRandomCellFrom(ownCells);
        }
    }
];

export default simpleBots;
