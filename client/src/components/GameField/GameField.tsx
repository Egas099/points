import { FC } from 'react';
import { Player, PlayerEntity } from '../../data/enums';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CellItem from './Cell/CellItem';
import styles from './GameField.module.css';

interface Props {
    field: Cell[][];
    move: (cell: Cell) => void;
}

const GameField: FC<Props> = ({ field, move }) => {
    const gameState = useTypedSelector(state => state.gameState);

    const currentPlayerEntity = gameState.players.find(
        cell => cell.player === gameState.mover
    )?.entity.playerEntity;

    const isMoveAllowed = (player: Player) =>
        currentPlayerEntity === PlayerEntity.localPlayer &&
        !gameState.moveBlock &&
        gameState.mover === player &&
        gameState.gameStarted;

    return (
        <div className={styles.wrapper}>
            {field.map((row, i) => (
                <div className={styles.row} key={i}>
                    {row.map(cell => (
                        <CellItem
                            key={cell.id}
                            id={cell.id}
                            count={cell.count}
                            player={cell.player}
                            allow={cell.allow}
                            isMover={isMoveAllowed(cell.player)}
                            move={move}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameField;
