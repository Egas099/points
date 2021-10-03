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
import AI from './logic/AI'
import { gameSettings } from './data';
import { givenState } from './store/gameFieldReducer';

function App() {
    const BOT_MOVING_INTERVAL = 100;
    const dispatch = useDispatch()
    const [showM, setShowM] = useState<boolean>(false);
    const state = useTypedSelector(state => state)
    // eslint-disable-next-line
    const [title, setTitle] = useState("User win")
    const [winCount, setWinCount] = useState(100)
    const [winStatistic, setWinStatistic] = useState({
        red: 0,
        orange: 0,
        green: 0,
        blue: 0,
    })

    useEffect(() => {
        if (state.gameState.gameStarted && state.gameState.moveBlock) {
            checkCellsToOverflow(state.field, dispatch)
        }
    }, [state.gameState.gameStarted, state.gameState.moveBlock])

    useEffect(() => {
        setTimeout(() => move(botMoving(state)), BOT_MOVING_INTERVAL);
        // eslint - disable - next - line
    }, [state.gameState.moveNumber, state.gameState.gameStarted])

    useEffect(() => {
        if (state.gameState.endGame) {
            const newWinStatistic = { ...winStatistic }
            switch (state.gameState.mover) {
                case Player.red:
                    newWinStatistic.red++;
                    break;
                case Player.orange:
                    newWinStatistic.orange++;
                    break;
                case Player.green:
                    newWinStatistic.green++;
                    break;
                case Player.blue:
                    newWinStatistic.blue++;
                    break;
            }
            setWinStatistic(newWinStatistic);
            // setTitle(`${Player[state.gameState.players[0]]} игрок одержал победу за ${state.gameState.moveNumber} ходов`);
            // setShowM(true)
            if (winCount > 1) {
                dispatch(aC.restartGame());
            }
            setWinCount(winCount - 1);
        }
        // eslint-disable-next-line
    }, [state.gameState.endGame])

    function test() {
        dispatch(aC.allowMoving())
    }
    function hideModal() {
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
    function createPlayersForm(): PlayerProfile[] {
        return gameSettings.template.spawns.map((spawn) => {
            return {
                player: spawn.player,
                status: PlayerStatus.none,
            }
        })
    }
    return (
        <div className="App">
            <div className="App__content">
                <ModalWimdow show={showM} title={title} text="" callback={() => hideModal()} />
                {!state.gameState.gameStarted
                    ? <PlayersForm onSubmit={gameStarting} form={createPlayersForm()}>
                        <GameField field={givenState(gameSettings.template)} onMove={() => { }} />
                    </PlayersForm>
                    : <>
                        <GameField field={state.field} onMove={move} />
                        <button className='btn' onClick={() => dispatch(aC.restartGame())}>Restart</button>
                    </>
                }
            </div>
        </div>
    );
}

export default App;
