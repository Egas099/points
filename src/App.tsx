import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GameField from './components/GameField/GameField';
import './css/App.css';
import { useTypedSelector } from './hooks/useTypedSelector';
import { calcPosition, cellZeroing, playerMove, restartGame } from './store/gameReducer';

function App() {
    const dispatch = useDispatch()
    const state = useTypedSelector(state => state.game)

    useEffect(() => {
        console.log("useEffect");
        state.field.map((row) => {
            row.map((cell) => {
                if (cell.count > 3) {
                    const [x, y] = calcPosition(cell.id);
                    try {
                        dispatch(playerMove(state.field[y + 1][x].id));
                    } catch { }
                    try {
                        dispatch(playerMove(state.field[y][x + 1].id));
                    } catch { }
                    try {
                        dispatch(playerMove(state.field[y - 1][x].id));
                    } catch { }
                    try {
                        dispatch(playerMove(state.field[y][x - 1].id));
                    } catch { }
                    dispatch(cellZeroing(state.field[y][x].id));
                }
            })
        })
    }, [state])

    return (
        <div className="App">
            <div className="App__content">
                <GameField field={state.field}></GameField>
                <button onClick={() => dispatch(restartGame())}>Restart</button>
            </div>
        </div>
    );
}

export default App;
