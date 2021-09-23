import { Dispatch } from "react";
import { playerMove } from "..";
import { RootState } from "../../store";
import { find } from "../functions";

export default function move(state: RootState, dispatch: Dispatch<any>) {
    if (state.gameState.moveBlock) return;
    let cells = find.cellsByPlayer(state.field.field, state.gameState.mover)

    const threeCountPoints = cells.reduce((acum, cur) => cur.count === 3 ? acum + 1 : acum, 0)

    if (threeCountPoints > 0) {
        cells = cells.filter(c => c.count === 3)
        playerMove(state, dispatch, cells[Math.floor(Math.random() * cells.length)]);
    } else {
        if (cells.length > 0) playerMove(state, dispatch, cells[Math.floor(Math.random() * cells.length)]);
    }
}