import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from './hooks/useTypedSelector';
import './css/App.css';
import GameField from './components/GameField/GameField';
import ModalWimdow from './components/ModalWindow/AlertPopup';
import * as aC from './store/actionCreator'
import { botMoving, checkCellsToOverflow } from './logic';
import { Player, PlayerStatus } from './types';
import PlayersForm from './components/PlayersForm/PlayersForm';
import { gameSettings } from './data';
import { givenState } from './store/gameFieldReducer';
import { create, upFirst } from './logic/functions';

function App() {
    const BOT_MOVING_INTERVAL = 0;
    const dispatch = useDispatch()
    const [showM, setShowM] = useState<boolean>(false);
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
            setShowM(true)
        }
        // eslint-disable-next-line
    }, [state.gameState.endGame])

    function hideModal() {
        clearTimeout(timer)
        setShowM(false)
        dispatch(aC.restartGame());
    }
    function move(cell: Cell | undefined) {
        if (
            cell &&
            state.gameState.gameStarted &&
            !state.gameState.moveBlock &&
            state.gameState.mover === cell.player
        ) {
            dispatch(aC.playerMove(cell))
        }
    }
    function gameStarting(form: PlayerProfile[]) {
        const filteredSpawns = gameSettings.template.spawns.filter(
            (spawn, i) => form[i].status !== PlayerStatus.none
        )
        gameSettings.playersProfiles = form;
        dispatch(aC.startGame({ ...gameSettings.template, spawns: filteredSpawns }));
    }
    function gameRestarting() {
        dispatch(aC.restartGame())
    }
   
    return (
        <div className="App">
            <div className="App__content">
                <ModalWimdow
                    show={showM}
                    title={title}
                    buttonText="Restart"
                    callback={() => hideModal()}
                />
                {!state.gameState.gameStarted
                    ?
                    <PlayersForm onSubmit={gameStarting} form={create.createPlayersForm()}>
                        <GameField field={givenState(gameSettings.template)} onMove={() => { }} />
                    </PlayersForm>
                    :
                    <>
                        <GameField field={state.field} onMove={move} />
                        <button className='btn' onClick={() => gameRestarting()}>Restart</button>
                    </>
                }
            </div>
        </div >
    );
}

export default App;
