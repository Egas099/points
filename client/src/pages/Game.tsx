import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import GameField from '../components/GameField/GameField';
import ModalWimdow from '../components/ModalWindow/AlertPopup';
import PlayersForm from '../components/PlayersForm/PlayersForm';
import * as actionCreator from '../store/actionCreator';
import { botMoving, checkCellsToOverflow, findProfileByPlayer } from '../logic';
import { Player, PlayerEntity } from '../types';
import { filterEmptyPlayers, findTemplateById, upFirst } from '../logic/common';
import { emit } from '../socketWorker';
// import { init as socketInit } from '../socketWorker';
import { BOT_MOVING_INTERVAL } from '../data/constants';
import MenuPopup from '../components/ModalWindow/MenuPopup';
import MainMenu from '../components/MainMenu/MainMenu';
import { createFieldByTemplateId } from '../logic/create';
import { useSaves } from '../hooks/useSaves';

interface GameProps {
    type: 'single' | 'multiplayer';
}

const Game: FC<GameProps> = ({ type }) => {
    // useEffect(() => {
    //     if (type === 'multiplayer') {
    //         socketInit();
    //     }
    // });

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const state = useTypedSelector(state => state);
    const [timer, setTimer] = useState<NodeJS.Timeout>(setTimeout(() => 0, 0));
    const [title, setTitle] = useState('User win');
    const savesStorage = useSaves();

    useEffect(() => {
        if (state.gameState.gameStarted && state.gameState.moveBlock) {
            checkCellsToOverflow(state.field, dispatch);
        }
    }, [state.gameState.gameStarted, state.gameState.moveBlock]);

    useEffect(() => {
        const profile = findProfileByPlayer(state.gameState);

        if (
            profile?.entity.playerEntity === PlayerEntity.android &&
            !state.gameState.moveBlock &&
            state.gameState.gameStarted
        ) {
            const botMove = botMoving(state, profile?.entity.id);
            if (botMove) {
                setTimer(setTimeout(() => move(botMove), BOT_MOVING_INTERVAL));
            }
        }
    }, [state.gameState.moveNumber, state.gameState.gameStarted]);

    useEffect(() => {
        if (state.gameState.endGame) {
            setTitle(
                `${upFirst(Player[state.gameState.players[0].player])}
                одержал победу за ${state.gameState.moveNumber} ходов`
            );
            setShowModal(true);
        }
    }, [state.gameState.endGame]);

    function hideModal() {
        clearTimeout(timer);
        setShowModal(false);
        dispatch(actionCreator.restartGame());
    }
    function move(cell: Cell) {
        if (
            cell &&
            state.gameState.gameStarted &&
            !state.gameState.moveBlock &&
            state.gameState.mover === cell.player
        ) {
            emit('playerMove', cell);
            dispatch(actionCreator.playerMove(cell));
        }
    }
    function gameStarting(profiles: PlayerProfile[]) {
        dispatch(
            actionCreator.startGame({
                templateId: 0,
                playersProfiles: filterEmptyPlayers(profiles)
            })
        );
    }
    function gameRestarting() {
        clearTimeout(timer);
        dispatch(actionCreator.restartGame());
    }
    function gameSaving() {
        savesStorage.save(state);
        gameRestarting();
    }
    function loadGame() {
        const saving = savesStorage.load();
        if (saving) {
            dispatch(actionCreator.loadGame(saving.state));
        }
    }
    return (
        <>
            <ModalWimdow
                show={showModal}
                title={title}
                buttonText="Restart"
                callback={() => hideModal()}
            />
            <MenuPopup show={showMenu}>
                <MainMenu />
            </MenuPopup>
            {!state.gameState.gameStarted ? (
                <>
                    <button className="btn" onClick={() => loadGame()}>
                        Load
                    </button>
                    <PlayersForm
                        onSubmit={gameStarting}
                        players={findTemplateById(0).spawns.map(s => s.player)}
                    >
                        <GameField field={createFieldByTemplateId(0)} />
                    </PlayersForm>
                </>
            ) : (
                <>
                    <button
                        className="btn"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        Menu
                    </button>
                    <button className="btn" onClick={() => gameSaving()}>
                        Save
                    </button>
                    <GameField field={state.field} onMove={move} />
                    <button className="btn" onClick={() => gameRestarting()}>
                        Restart
                    </button>
                </>
            )}
        </>
    );
};

export default Game;
