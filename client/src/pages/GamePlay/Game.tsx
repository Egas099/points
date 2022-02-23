import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GameField from '../../components/GameField/GameField';
import HeaderButtonPanel from '../../components/HeaderPanel/HeaderPanel';
import AlertPopup from '../../components/ModalWindow/AlertPopup';
import MenuPopup, {
    MenuPopupActions
} from '../../components/ModalWindow/MenuPopup';
import PlayersForm from '../../components/PlayersForm/PlayersForm';
// import { init as socketInit } from '../socketWorker';
import { BOT_MOVING_INTERVAL } from '../../data/constants';
import { Player, PlayerEntity } from '../../data/enums';
import { fieldTemplates } from '../../data/fieldTemplates';
import { useSaves } from '../../hooks/useSaves';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
    botMoving,
    checkCellsToOverflow,
    findProfileByPlayer
} from '../../logic';
import { upFirst } from '../../logic/common';
import { emit } from '../../socketWorker';
import * as actionCreator from '../../store/actionCreator';
import styles from './GamePlay.module.css';
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
    const localStorage = useSaves();
    const state = useTypedSelector(state => state);
    const [showAlert, setShowAlert] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
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
            setShowAlert(true);
            setShowMenu(false);
        }
    }, [state.gameState.endGame]);

    function hideModal() {
        clearTimeout(timer);
        setShowAlert(false);
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
        setShowMenu(false);
    }
    function gameSaving() {
        localStorage.save(state);
        setShowMenu(false);
    }

    const menuActions: MenuPopupActions = {
        continue: () => setShowMenu(false),
        reset: state.gameState.gameStarted ? gameRestarting : undefined,
        save: state.gameState.gameStarted ? gameSaving : undefined
    };

    return (
        <div className={styles.wrapper}>
            <AlertPopup
                show={showAlert}
                title={title}
                buttonText="Restart"
                callback={() => hideModal()}
            />
            <MenuPopup show={showMenu} actions={menuActions}></MenuPopup>
            <HeaderButtonPanel showMenu={() => setShowMenu(!showMenu)} />

            <div className={styles.content}>
                {!state.gameState.gameStarted ? (
                    <PlayersForm
                        onSubmit={gameStarting}
                        templates={fieldTemplates}
                    />
                ) : (
                    <GameField field={state.field} onMove={move} />
                )}
            </div>
        </div>
    );
};

export default Game;
