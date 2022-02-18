import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import GameField from '../../components/GameField/GameField';
import ModalWimdow from '../../components/ModalWindow/AlertPopup';
import MenuPopup from '../../components/ModalWindow/MenuPopup';
import PlayersForm from '../../components/PlayersForm/PlayersForm';
// import { init as socketInit } from '../socketWorker';
import { BOT_MOVING_INTERVAL, FIELD_TEMPLATE_ID } from '../../data/constants';
import { Player, PlayerEntity } from '../../data/enums';
import { fieldTemplates } from '../../data/fieldTemplates';
import { useSaves } from '../../hooks/useSaves';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
    botMoving,
    checkCellsToOverflow,
    findProfileByPlayer
} from '../../logic';
import { filterEmptyPlayers, upFirst } from '../../logic/common';
import MainMenu from '../../routes/MainMenuRouter';
import { emit } from '../../socketWorker';
import * as actionCreator from '../../store/actionCreator';

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
    const savesStorage = useSaves();
    const state = useTypedSelector(state => state);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>(setTimeout(() => 0, 0));
    const [title, setTitle] = useState('User win');

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
    function gameStarting(form: GameSettings) {
        dispatch(actionCreator.startGame(form));
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
            <Link to="/menu">Menu</Link>
            {/* <MenuPopup show={showMenu}><MainMenu /></MenuPopup> */}
            {!state.gameState.gameStarted ? (
                <>
                    <button className="btn" onClick={() => loadGame()}>
                        Load
                    </button>
                    <PlayersForm
                        onSubmit={gameStarting}
                        templates={fieldTemplates}
                    />
                </>
            ) : (
                <>
                    {/* <button
                        className="btn"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        Menu
                    </button> */}
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
