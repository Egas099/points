import { useEffect, useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import GameField from './components/GameField/GameField';
import ModalWimdow from './components/ModalWindow/AlertPopup';
import './css/App.css';
import { useDispatch } from 'react-redux';
import botSimpleMove from './logic/AI/simple';
import botNormalMove from './logic/AI/normal';
import { Player } from './types';
import * as aC from './store/actionCreator'

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
            if (gameState.mover === Player.blue) {
                setTimeout(() => botNormalMove(state, dispatch), 0);
            } else {
                setTimeout(() => botSimpleMove(state, dispatch), 0);
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
