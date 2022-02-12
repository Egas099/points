import { Dispatch } from 'react'
import { find } from './common'
import * as aC from '../store/actionCreator'
import { RootState } from '../store'
import { gameSettings } from '../data'
import { Player } from '../types'

export const checkCellsToOverflow = (
    field: Cell[][],
    dispatch: Dispatch<any>
) => {
    const cell = find.overflowingCell(field)

    if (cell) {
        dispatch(aC.CellCloning(cell))
        setTimeout(() => checkCellsToOverflow(field, dispatch), 0)
    } else {
        dispatch(aC.newMove(field))
    }
}
export function botMoving(state: RootState): Cell | undefined {
    const implementations = gameSettings.botsImplementations
    switch (state.gameState.mover) {
        case Player.red:
            return implementations.red(state)
        case Player.orange:
            return implementations.orange(state)
        case Player.green:
            return implementations.green(state)
        case Player.blue:
            return implementations.blue(state)
    }
}

export function findStatusByPlayer(player: Player) {
    return gameSettings.playersProfiles.find(prf => prf.player === player)
        ?.status
}
