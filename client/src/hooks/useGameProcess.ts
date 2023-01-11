import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlayerEntity } from '../data/enums';
import { useTypedSelector } from './useTypedSelector';
import * as actionCreator from '../store/actionCreator';
import { useSaves } from './useSaves';
import { findOverflowingCell } from '../utils/common';
import AI from '../utils/AI';

export function useGameProcess() {
    const { saveGame } = useSaves();
    const [pause, setPause] = useState(false);
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
        state.gameState.moveBlock,
        pause
    ]);

    useEffect(botMove, [
        state.gameState.moveNumber,
        state.gameState.gameStarted,
        pause
    ]);

    // TODO: rename, decomposition
    function moveProcessing() {
        if (pause) {
            return;
        }
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
        if (pause) {
            return;
        }
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
    const gameSaving = () => saveGame(state);
    const gameRestarting = useCallback(() => {
        clearTimeout(botMovingDelayTimer);
        clearTimeout(cellCloningDelayTimer);
        dispatch(actionCreator.restartGame());
    }, []);
    const gameStarting = useCallback(
        (form: GameForm) => dispatch(actionCreator.startGame(form)),
        []
    );
    const pauseGame = useCallback(() => setPause(true), []);
    const continueGame = useCallback(() => setPause(false), []);

    return {
        playerMove: move,
        start: gameStarting,
        reset: gameRestarting,
        save: gameSaving,
        pause: pauseGame,
        continue: continueGame
    };
}
