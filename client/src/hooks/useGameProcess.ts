import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlayerEntity } from '../data/enums';
import { useTypedSelector } from './useTypedSelector';
import * as actionCreator from '../store/actionCreator';
import { useSaves } from './useSaves';
import { findOverflowingCell } from '../functions/common';
import AI from '../functions/AI';

export function useGameProcess() {
    const { saveGame } = useSaves();
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
                    setTimeout(
                        () => moveProcessing(),
                        state.settings.cellCloningDelay
                    )
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
                    setTimeout(
                        () => move(botMove),
                        state.settings.botMovingDelay
                    )
                );
            } else {
                console.error("Can't get bot moving");
            }
        }
        return () => clearTimeout(botMovingDelayTimer);
    }

    const move = useCallback((cell: Cell) => {
        dispatch(actionCreator.playerMove(cell));
    }, []);

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
