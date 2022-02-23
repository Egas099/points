import { Dispatch } from 'react';
import { find } from './common';
import * as aC from '../store/actionCreator';
import { RootState } from '../store';
import AI from './AI';
import { CELL_CLONING_INTERVAL } from '../data/constants';

export const checkCellsToOverflow = (
    field: Cell[][],
    dispatch: Dispatch<any>
) => {
    const cell = find.overflowingCell(field);

    if (cell) {
        dispatch(aC.CellCloning(cell));
        setTimeout(() => checkCellsToOverflow(field, dispatch), CELL_CLONING_INTERVAL);
    } else {
        dispatch(aC.newMove(field));
    }
};
export function botMoving(state: RootState, id: string): Cell {
    return AI.getBotImplementationById(id)(state);
}

export function findProfileByPlayer(state: GameState) {
    return state.players.find(profile => profile.player === state.mover);
}
