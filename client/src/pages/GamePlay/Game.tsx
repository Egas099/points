import { FC, useEffect, useState } from 'react';
import GameField from '../../components/GameField/GameField';
import HeaderButtonPanel from '../../components/HeaderPanel/HeaderPanel';
import AlertPopup from '../../components/ModalWindow/AlertPopup';
import MenuPopup, {
    MenuPopupActions
} from '../../components/ModalWindow/MenuPopup';
import PlayersForm from '../../components/PlayersForm/PlayersForm';
import { Player } from '../../data/enums';
// import { init as socketInit } from '../socketWorker';
import { fieldTemplates } from '../../data/fieldTemplates';
import { useGameProcess } from '../../hooks/useGameProcess';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { upFirst } from '../../logic/common';
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

    const state = useTypedSelector(state => state);
    const [showAlert, setShowAlert] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState('User win');
    const gamePlay = useGameProcess();

    useEffect(checkEndGame, [state.gameState.endGame]);

    function checkEndGame() {
        if (state.gameState.endGame) {
            setTitle(
                `${upFirst(Player[state.gameState.players[0].player])}
                won in ${state.gameState.moveNumber} moves`
            );
            setShowMenu(false);
            setShowAlert(true);
        }
    }

    function gameStarting(form: GameForm) {
        gamePlay.start(form);
    }
    function gameRestarting() {
        gamePlay.reset();
        setShowMenu(false);
        setShowAlert(false);
    }
    function gameSaving() {
        gamePlay.save();
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
                callback={gameRestarting}
            />
            <MenuPopup show={showMenu} actions={menuActions} />
            <HeaderButtonPanel showMenu={() => setShowMenu(!showMenu)} />
            <div className={styles.content}>
                {!state.gameState.gameStarted ? (
                    <PlayersForm
                        onSubmit={gameStarting}
                        templates={fieldTemplates}
                    />
                ) : (
                    <GameField
                        field={state.field}
                        onMove={gamePlay.playerMove}
                    />
                )}
            </div>
        </div>
    );
};

export default Game;
