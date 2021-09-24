import { Dispatch } from 'react';
import { fieldSize } from '../data';
import { RootState } from '../store';
import { Player } from '../types';
import { calc, find } from './functions';
import * as aC from '../store/actionCreator'

const checkCellsToOverflow = (state: GameField, dispatch: Dispatch<any>) => {
    const cell = find.overflowingCell(state.field);

    if (cell) {
        cloneCell(state, dispatch, cell)
        setTimeout(() => checkCellsToOverflow(state, dispatch), 0)
    } else {
        dispatch(aC.nextMover(state.field));
        // dispatch(aC.allowMoving())
    }
}

const cloneCell = (state: GameField, dispatch: Dispatch<any>, cell: Cell) => {
    const player = cell.player;
    const [x, y] = calc.cellPositionById(cell.id);

    dispatch(aC.cellZeroing(state.field[x][y].id));

    if (cell.count === 5)
        cellIncAndCapture(dispatch, state.field[x][y].id, player)

    if (x + 1 < fieldSize.y)
        cellIncAndCapture(dispatch, state.field[x + 1][y].id, player)

    if (y + 1 < fieldSize.x)
        cellIncAndCapture(dispatch, state.field[x][y + 1].id, player)

    if (x - 1 >= 0)
        cellIncAndCapture(dispatch, state.field[x - 1][y].id, player)

    if (y - 1 >= 0)
        cellIncAndCapture(dispatch, state.field[x][y - 1].id, player)
}

const cellIncAndCapture = (dispatch: Dispatch<any>, id: number, player: Player) => {
    dispatch(aC.cellCapture({ cellId: id, player: player }))
    dispatch(aC.cellIncrement(id));
}

export const playerMove = (state: RootState, dispatch: Dispatch<any>, cell: Cell) => {
    if (!cell) return;

    if (state.gameState.moveBlock) return;
    if (state.gameState.mover === cell.player) {
        dispatch(aC.cellIncrement(cell.id))
        dispatch(aC.blockMoving())

        checkCellsToOverflow(state.field, dispatch);
    }
}
