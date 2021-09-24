import { useEffect, useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import GameField from './components/GameField/GameField';
import ModalWimdow from './components/ModalWindow/AlertPopup';
import './css/App.css';
import { useDispatch } from 'react-redux';
import { Player } from './types';
import * as aC from './store/actionCreator'
import { c1, c2, c3, c4 } from './logic/AI/simple';
import { playerMove } from './logic';

function App() {
    const dispatch = useDispatch()
    const [showM, setShowM] = useState<boolean>(false);
    const state = useTypedSelector(state => state)
    const gameState = useTypedSelector(state => state.gameState)
    const field = useTypedSelector(state => state.field.field)
    // eslint-disable-next-line
    const [title, setTitle] = useState("User win")

    useEffect(() => {
        if (!gameState.moveBlock) {
            switch (gameState.mover) {
                case Player.red:
                    setTimeout(() => playerMove(state, dispatch, c1(state)), 0);
                    break;
                case Player.orange:
                    setTimeout(() => playerMove(state, dispatch, c2(state)), 0);
                    break;
                case Player.green:
                    setTimeout(() => playerMove(state, dispatch, c3(state)), 0);
                    break;
                case Player.blue:
                    setTimeout(() => playerMove(state, dispatch, c4(state)), 0);
                    break;
                default:
                    break;
            }
        }
        // eslint-disable-next-line
    }, [gameState.moveBlock])

    function swithMoving() {
        if (gameState.moveBlock) {
            dispatch(aC.allowMoving())
        } else {
            dispatch(aC.blockMoving())
        }
    }

    return (
        <div className="App">
            <div className="App__content">
                <ModalWimdow show={showM} title={title} text="" callback={() => setShowM(false)} />
                <GameField field={field}></GameField>
                <button onClick={() => dispatch(aC.restartGame())}>Restart</button>
                <button onClick={() => swithMoving()}>Next</button>
            </div>
        </div>
    );
}

export default App;
