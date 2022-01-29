import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import GameField from '../components/GameField/GameField';
import ModalWimdow from '../components/ModalWindow/AlertPopup';
import PlayersForm from '../components/PlayersForm/PlayersForm';
import * as actionCreator from '../store/actionCreator'
import { botMoving, checkCellsToOverflow } from '../logic';
import { Player, PlayerStatus } from '../types';
import { upFirst } from '../logic/common';
import { gameSettings } from '../data';
import { givenState } from '../store/gameFieldReducer';
import { emit } from '../socketWorker';
import { createPlayersForm } from '../logic/create';
import { init as socketInit } from '../socketWorker';
import { APP_VERSION } from '../data/constants';
import { RootState } from '../store';
import MenuPopup from '../components/ModalWindow/MenuPopup';
import MainMenu from '../components/MainMenu/MainMenu';
import AI from '../logic/AI';

interface GameProps {
    type: "single" | "multiplayer"
}

export interface Save {
    date: number,
    appVersion: string,
    state: RootState
}

const Game: FC<GameProps> = ({ type }) => {
    useEffect(() => {
        if (type === "multiplayer") {
            console.log("Подключение к серверу");
            socketInit();
        } else {
            console.log("Одиночная игра");
        }
    })

    const BOT_MOVING_INTERVAL = 0;
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const state = useTypedSelector(state => state)
    const [timer, setTimer] = useState<NodeJS.Timeout>(setTimeout(() => 0, 0))
    const [title, setTitle] = useState("User win")

    useEffect(() => {
        if (state.gameState.gameStarted && state.gameState.moveBlock) {
            checkCellsToOverflow(state.field, dispatch)
        }
        // eslint-disable-next-line
    }, [state.gameState.gameStarted, state.gameState.moveBlock])

    useEffect(() => {
        setTimer(setTimeout(() => move(botMoving(state)), BOT_MOVING_INTERVAL));
        // eslint-disable-next-line
    }, [state.gameState.moveNumber, state.gameState.gameStarted])

    useEffect(() => {
        if (state.gameState.endGame) {
            setTitle(
                `${upFirst(Player[state.gameState.players[0]])}
                одержал победу за ${state.gameState.moveNumber} ходов`
            );
            setShowModal(true)
        }
        // eslint-disable-next-line
    }, [state.gameState.endGame])

    function hideModal() {
        clearTimeout(timer)
        setShowModal(false)
        dispatch(actionCreator.restartGame());
    }
    function move(cell: Cell | undefined) {
        if (
            cell &&
            state.gameState.gameStarted &&
            !state.gameState.moveBlock &&
            state.gameState.mover === cell.player
        ) {
            emit("playerMove", cell)
            dispatch(actionCreator.playerMove(cell))
        }
    }
    function gameStarting(form: PlayerProfile[]) {
        const filteredSpawns = gameSettings.template.spawns.filter(
            (spawn, i) => form[i].status !== PlayerStatus.none
        )
        gameSettings.playersProfiles = form;
        gameSettings.botsImplementations.blue = AI.getBotImplementationById(gameSettings.bots.blue)
        gameSettings.botsImplementations.red = AI.getBotImplementationById(gameSettings.bots.red)
        gameSettings.botsImplementations.green = AI.getBotImplementationById(gameSettings.bots.green)
        gameSettings.botsImplementations.orange = AI.getBotImplementationById(gameSettings.bots.orange)
        dispatch(actionCreator.startGame({ ...gameSettings.template, spawns: filteredSpawns }));
    }
    function gameRestarting() {
        dispatch(actionCreator.restartGame())
    }
    const createSave = (): Save => ({
        date: Date.now(),
        appVersion: APP_VERSION,
        state: state
    })
    function gameSaving() {
        let saves = JSON.parse(localStorage.getItem('saves') || "[]")
        if (Array.isArray(saves)) {
            saves.push(createSave())
        } else {
            saves = [createSave()];
        }
        localStorage.setItem('saves', JSON.stringify(saves));
    }
    function loadGame() {
        const save: Save = JSON.parse(localStorage.getItem('saves') || "[]")[0] || [];
        if (save.state) {
            dispatch(actionCreator.loadGame(save.state));
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
                <MainMenu></MainMenu>
            </MenuPopup>
            {!state.gameState.gameStarted
                ?
                <>
                    <button className='btn' onClick={() => loadGame()}>Load</button>
                    <PlayersForm onSubmit={gameStarting} form={createPlayersForm(gameSettings.template.spawns)}>
                        <GameField field={givenState(gameSettings.template)} onMove={() => { }} />
                    </PlayersForm>
                </>
                :
                <>
                    <button className='btn' onClick={() => setShowMenu(!showMenu)}>Menu</button>
                    <button className='btn' onClick={() => gameSaving()}>Save</button>
                    <GameField field={state.field} onMove={move} />
                    <button className='btn' onClick={() => gameRestarting()}>Restart</button>
                </>
            }
        </>
    );
}

export default Game

