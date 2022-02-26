import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlayerEntity } from '../data/enums';
import { useTypedSelector } from './useTypedSelector';
import * as actionCreator from '../store/actionCreator';
import { useSaves } from './useSaves';
import { findOverflowingCell } from '../logic/common';
import AI from '../logic/AI';

export function useGameProcess() {
    const settings = useTypedSelector(state => state.settings);

    const {saveGame} = useSaves();
    const [botMovingDelayTimer, setBotMovingDelayTimer] = useState(
        setTimeout(() => 0, 0)
    );
    const [cellCloningDelayTimer, setCellCloningDelayTimer] = useState(
        setTimeout(() => 0, 0)
    );
    const dispatch = useDispatch();
    const state = useTypedSelector(state => state);

    useEffect(moveProcessing, [
        state.gameState.gameStarted,
        state.gameState.moveBlock
    ]);

    useEffect(botMove, [
        state.gameState.moveNumber,
        state.gameState.gameStarted
    ]);

    function moveProcessing() {
        const moveCompleted =
            state.gameState.gameStarted && state.gameState.moveBlock;
        if (moveCompleted) {
            const cell = findOverflowingCell(state.field);

            if (cell) {
                dispatch(actionCreator.CellCloning(cell));
                setCellCloningDelayTimer(
                    setTimeout(() => moveProcessing(), settings.cellCloningDelay)
                );
            } else {
                dispatch(actionCreator.newMove(state.field));
            }
        }
        return () => clearTimeout(cellCloningDelayTimer);
    }

    function botMove() {
        const profile = state.gameState.players.find(
            profile => profile.player === state.gameState.mover
        );

        if (
            profile?.entity.playerEntity === PlayerEntity.android &&
            !state.gameState.moveBlock &&
            state.gameState.gameStarted
        ) {
            const botMove = AI.getBotMoveById(profile.entity.id, state);
            if (botMove) {
                setBotMovingDelayTimer(
                    setTimeout(() => move(botMove), settings.botMovingDelay)
                );
            }
        }
        return () => clearTimeout(botMovingDelayTimer);
    }

    function move(cell: Cell) {
        if (
            cell &&
            state.gameState.gameStarted &&
            !state.gameState.moveBlock &&
            state.gameState.mover === cell.player
        ) {
            dispatch(actionCreator.playerMove(cell));
        }
    }
    function gameSaving() {
        saveGame(state);
    }
    function gameRestarting() {
        clearTimeout(botMovingDelayTimer);
        clearTimeout(cellCloningDelayTimer);
        dispatch(actionCreator.restartGame());
    }
    function gameStarting(form: GameForm) {
        dispatch(actionCreator.startGame(form));
    }
    return {
        playerMove: move,
        start: gameStarting,
        reset: gameRestarting,
        save: gameSaving
    };
}
