import { useEffect, useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import GameField from './components/GameField/GameField';
import ModalWimdow from './components/ModalWindow/AlertPopup';
import './css/App.css';
import { useDispatch } from 'react-redux';
import * as aC from './store/actionCreator'
import * as bots from './logic/AI/simple';
import { checkCellsToOverflow } from './logic';
import { calc, random } from './logic/functions';
import { Player } from './types';
import { b1, b2 } from './logic/AI/normal';

function App() {
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
        if (state.gameState.moveBlock)
            checkCellsToOverflow(state.field, dispatch)
        // eslint-disable-next-line
    }, [state.gameState.moveBlock])

    useEffect(() => {
        if (state.gameState.moveBlock === false) {
            switch (state.gameState.mover) {
                case Player.red:
                    // console.log(calc.cellPositionById(b1(state).id));
                    setTimeout(() => botMove(bots.c4(state)), 0);
                    break;
                case Player.orange:
                    setTimeout(() => botMove(bots.c2(state)), 0);
                    break;
                case Player.green:
                    setTimeout(() => botMove(bots.c3(state)), 0);
                    break;
                case Player.blue:
                    setTimeout(() => botMove(b2(state)), 0);
                    break;
                default:
                    setTimeout(() => botMove(random.elemetFrom(Object(bots))(state)), 0);
                    break;
            }
        }
        // eslint-disable-next-line
    }, [state.gameState.moveNumber])

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

    function botMove(cell: Cell) {
        if (cell) {
            dispatch(aC.playerMove(cell))
        }
    }

    function test() {
        dispatch(aC.allowMoving())
    }
    function hideModal() {
        setShowM(false)
        dispatch(aC.restartGame());
    }
    return (
        <div className="App">
            <div className="App__content">
                <ModalWimdow show={showM} title={title} text="" callback={() => hideModal()} />
                <GameField field={state.field}></GameField>
                <button onClick={() => dispatch(aC.restartGame())}>Restart</button>
                <button onClick={() => test()}>Action</button>
            </div>
        </div>
    );
}

export default App;
