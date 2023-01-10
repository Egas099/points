import { BotProfile } from '.';
import { RootState } from '../../store';
import {
    attackEnemy,
    attackThreePointEnemy,
    chooseMaxCountRandomCellFrom,
    chooseRandomCellFrom,
    dontPickBattles,
    expand,
    threePointPriorityMove
} from './aiBehavior';

const normalBots: BotProfile[] = [
    {
        name: 'b1',
        difficulty: 'normal',
        description:
            'Priority for capturing enemy cells with three dots, if they are next to their own cells with three dots.',
        implementation: (state: RootState, ownCells: Cell[]): Cell | void => {
            const threePoint = threePointPriorityMove(ownCells);
            if (threePoint.length) {
                const canAttack = attackThreePointEnemy(state, threePoint);

                if (canAttack.length) {
                    return chooseRandomCellFrom(canAttack);
                }
            }
        }
    },
    {
        name: 'b2',
        difficulty: 'normal',
        description: '',
        implementation: (state: RootState, ownCells: Cell[]): Cell | void => {
            const threePoint = threePointPriorityMove(ownCells);
            if (threePoint.length) {
                const canAttack = attackThreePointEnemy(state, threePoint);

                if (canAttack.length) {
                    return chooseRandomCellFrom(canAttack);
                }
                return chooseRandomCellFrom(threePoint);
            }
        }
    },
    {
        name: 'b3',
        difficulty: 'normal',
        description: '',
        implementation: (state: RootState, ownCells: Cell[]): Cell | void => {
            const threePoint = threePointPriorityMove(ownCells);
            if (threePoint.length) {
                const canAttack = attackThreePointEnemy(state, threePoint);

                if (canAttack.length) {
                    return chooseRandomCellFrom(canAttack);
                }
                return chooseRandomCellFrom(threePoint);
            }
            const dontPickBattle = dontPickBattles(state, ownCells);
            if (dontPickBattle.length) {
                return chooseRandomCellFrom(dontPickBattle);
            }
        }
    },
    {
        name: 'b4',
        difficulty: 'normal',
        description: '',
        implementation: (state: RootState, ownCells: Cell[]): Cell | void => {
            const threePoint = threePointPriorityMove(ownCells);
            if (threePoint.length) {
                const canAttack = attackThreePointEnemy(state, threePoint);

                if (canAttack.length) {
                    return chooseRandomCellFrom(canAttack);
                }
            }
            const canExpand = expand(state, ownCells);
            if (canExpand.length) {
                return chooseRandomCellFrom(canExpand);
            }
        }
    },
    {
        name: 'b5',
        difficulty: 'normal',
        description: 'Aggressive',
        implementation: (state: RootState, ownCells: Cell[]): Cell | void => {
            const threePoint = threePointPriorityMove(ownCells);
            if (threePoint.length) {
                const canAlreadyAttack = attackThreePointEnemy(
                    state,
                    threePoint
                );

                if (canAlreadyAttack.length) {
                    return chooseRandomCellFrom(canAlreadyAttack);
                }
            }
            const canAttack = attackEnemy(state, ownCells);
            if (canAttack.length) {
                return chooseMaxCountRandomCellFrom(canAttack);
            }
        }
    },
    {
        name: 'b6',
        difficulty: 'normal',
        description: 'dontPickBattles & aggressive',
        implementation: (state: RootState, ownCells: Cell[]): Cell | void => {
            const threePoint = threePointPriorityMove(ownCells);
            if (threePoint.length) {
                const canAlreadyAttack = attackThreePointEnemy(
                    state,
                    threePoint
                );

                if (canAlreadyAttack.length) {
                    return chooseRandomCellFrom(canAlreadyAttack);
                }
            }
            const canAttack = attackEnemy(state, ownCells);
            if (canAttack.length) {
                const dontPickBattle = dontPickBattles(state, canAttack);
                if (dontPickBattle.length) {
                    return chooseMaxCountRandomCellFrom(dontPickBattle);
                }
            }
        }
    },
    {
        name: 'b7',
        difficulty: 'normal',
        description: 'dontPickBattles & aggressive',
        implementation: (state: RootState, ownCells: Cell[]): Cell | void => {
            const threePoint = threePointPriorityMove(ownCells);
            if (threePoint.length) {
                const canAlreadyAttack = attackThreePointEnemy(
                    state,
                    threePoint
                );

                if (canAlreadyAttack.length) {
                    return chooseRandomCellFrom(canAlreadyAttack);
                }
            }
            const canAttack = attackEnemy(state, ownCells);
            if (canAttack.length) {
                const dontPickBattle = dontPickBattles(state, canAttack);
                if (dontPickBattle.length) {
                    return chooseMaxCountRandomCellFrom(dontPickBattle);
                }
            }
            const canExpand = expand(state, ownCells);
            if (canExpand.length) {
                const dontPickBattle = dontPickBattles(state, canExpand);
                if (dontPickBattle.length) {
                    return chooseRandomCellFrom(dontPickBattle);
                }
            }
            const dontPickBattle = dontPickBattles(state, ownCells);
            if (dontPickBattle.length) {
                return chooseMaxCountRandomCellFrom(dontPickBattle);
            }
        }
    },
    {
        name: 'b7',
        difficulty: 'normal',
        description: 'dontPickBattles & aggressive',
        implementation: (state: RootState, ownCells: Cell[]): Cell | void => {
            const threePoint = threePointPriorityMove(ownCells);
            if (threePoint.length) {
                const canAlreadyAttack = attackThreePointEnemy(
                    state,
                    threePoint
                );

                if (canAlreadyAttack.length) {
                    return chooseRandomCellFrom(canAlreadyAttack);
                }
            }
            const canAttack = attackEnemy(state, ownCells);
            if (canAttack.length) {
                const dontPickBattle = dontPickBattles(state, canAttack);
                if (dontPickBattle.length) {
                    return chooseMaxCountRandomCellFrom(dontPickBattle);
                }
            }
            const canExpand = expand(state, ownCells);
            if (canExpand.length) {
                const dontPickBattle = dontPickBattles(state, canExpand);
                if (dontPickBattle.length) {
                    return chooseRandomCellFrom(dontPickBattle);
                }
            }
            const dontPickBattle = dontPickBattles(state, ownCells);
            if (dontPickBattle.length) {
                return chooseMaxCountRandomCellFrom(dontPickBattle);
            }
        }
    }
];

export default normalBots;
