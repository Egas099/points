import { useEffect, useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import GameField from './components/GameField/GameField';
import ModalWimdow from './components/ModalWindow/AlertPopup';
import './css/App.css';
import { useDispatch } from 'react-redux';
import { restartGame } from './store/gameFieldReducer';
import { findAllCellByPlayer, playerMove } from './logic';

function App() {
    const dispatch = useDispatch()
    const [showM, setShowM] = useState<boolean>(false);
    const state = useTypedSelector(state => state)
    const gameState = useTypedSelector(state => state.gameState)
    const field = useTypedSelector(state => state.field.field)
    const [title, setTitle] = useState("User win")


    function autoMove() {
        if (gameState.moveBlock) return;
        const cell = findAllCellByPlayer(field, gameState.mover)
        if (cell.length > 0) playerMove(state, dispatch, cell[Math.floor(Math.random() * cell.length)]);
    }
    useEffect(() => {
        if (!gameState.moveBlock) {
            setTimeout(autoMove, 10);
        }
    }, [gameState.moveBlock])

    return (
        <div className="App">
            <div className="App__content">
                <ModalWimdow show={showM} title={title} text="" callback={() => setShowM(false)} />
                <GameField field={field}></GameField>
                <button onClick={() => dispatch(restartGame())}>Restart</button>
            </div>
        </div>
    );
}

export default App;
