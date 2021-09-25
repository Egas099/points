import { Dispatch } from 'react';
import { find } from './functions';
import * as aC from '../store/actionCreator'

export const checkCellsToOverflow = (field: Cell[][], dispatch: Dispatch<any>) => {
    const cell = find.overflowingCell(field);

    if (cell) {
        dispatch(aC.CellCloning(cell));
        setTimeout(() => checkCellsToOverflow(field, dispatch), 0)
    } else {

        dispatch(aC.newMove(field));
    }
}