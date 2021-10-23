import { Dispatch } from 'react';
import { find, random } from './functions';
import * as aC from '../store/actionCreator'
import { RootState } from '../store';
import { gameSettings } from '../data';
import { Player, PlayerStatus } from '../types';
import AI from './AI';

export const checkCellsToOverflow = (field: Cell[][], dispatch: Dispatch<any>) => {
    const cell = find.overflowingCell(field);

    if (cell) {
        dispatch(aC.CellCloning(cell));
        setTimeout(() => checkCellsToOverflow(field, dispatch), 0)
    } else {

        dispatch(aC.newMove(field));
    }
}
export function botMoving(state: RootState): Cell | undefined {
    if (!state.gameState.moveBlock && state.gameState.gameStarted) {
        const bots = gameSettings.bots;
        switch (state.gameState.mover) {
            case Player.red:
                if (findStatusByPlayer(Player.red) === PlayerStatus.android)
                    return bots.red(state);
                break;
            case Player.orange:
                if (findStatusByPlayer(Player.orange) === PlayerStatus.android)
                    return bots.orange(state);
                break;
            case Player.green:
                if (findStatusByPlayer(Player.green) === PlayerStatus.android)
                    return bots.green(state);
                break;
            case Player.blue:
                if (findStatusByPlayer(Player.blue) === PlayerStatus.android)
                    return bots.blue(state);
                break;
            default: break;
        }
    }
}

function findStatusByPlayer(player: Player) {
    return gameSettings.playersProfiles.find(prf => prf.player === player)?.status;
}

function chooseTemplate() {
    
}

