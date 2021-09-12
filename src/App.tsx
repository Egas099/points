import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GameField from './components/GameField/GameField';
import './css/App.css';
import { useTypedSelector } from './hooks/useTypedSelector';
import { checkCellsToOverflow } from './logic';
import { restartGame } from './store/gameReducer';

function App() {
    const dispatch = useDispatch()
    const state = useTypedSelector(state => state.game)

    useEffect(() => {
        if (state.moveBlock)
            checkCellsToOverflow(state, dispatch)
    }, [state.moveBlock])

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
