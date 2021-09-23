import { Dispatch } from "react";
import { playerMove } from "..";
import { RootState } from "../../store";
import { find } from "../functions";

export default function move(state: RootState, dispatch: Dispatch<any>) {
    if (state.gameState.moveBlock) return;
    
    const cell = find.cellsByPlayer(state.field.field, state.gameState.mover)
    if (cell.length > 0) playerMove(state, dispatch, cell[Math.floor(Math.random() * cell.length)]);
}