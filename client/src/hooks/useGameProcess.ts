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

    // TODO: rename, decomposition
    function moveProcessing() {
        const isMoveCompleted =
            state.gameState.gameStarted && state.gameState.moveBlock;
        if (!isMoveCompleted) {
            return;
        }

        const overflowingCell = findOverflowingCell(state.field);
        if (!overflowingCell) {
            dispatch(actionCreator.newMove(state.field));
            return;
        }

        dispatch(actionCreator.cellCloning(overflowingCell));

        const cloningTimer = setTimeout(
            moveProcessing,
            state.settings.cellCloningDelay
        );
        setCellCloningDelayTimer(cloningTimer);
        return () => clearTimeout(cellCloningDelayTimer);
    }

    function botMove() {
        const currentMoverProfile = state.gameState.players.find(
            profile => profile.player === state.gameState.mover
        );
        const shouldBotMove =
            currentMoverProfile?.entity.playerEntity === PlayerEntity.android &&
            !state.gameState.moveBlock &&
            state.gameState.gameStarted;
        if (!shouldBotMove) {
            return;
        }

        const botTurn = AI.getBotMoveById(currentMoverProfile.entity.id, state);
        if (!botTurn) {
            console.error("Can't get bot turn");
            return;
        }
        if (state.settings.botMovingDelay) {
            const botMovingTimer = setTimeout(
                () => move(botTurn),
                state.settings.botMovingDelay
            );
            setBotMovingDelayTimer(botMovingTimer);
            return () => clearTimeout(botMovingDelayTimer);
        }
        move(botTurn);
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
