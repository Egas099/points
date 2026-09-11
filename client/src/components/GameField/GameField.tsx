import { CSSProperties, FC } from 'react';
import { Player, PlayerEntity } from '../../types';
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

    const cols = field[0]?.length ?? 9;
    const rows = field.length;

    return (
        <div
            className={styles.wrapper}
            style={
                {
                    '--field-cols': cols,
                    '--field-rows': rows
                } as CSSProperties
            }
        >
            {field.map((row, i) => (
                <div className={styles.row} key={i}>
                    {row.map(cell => (
                        <CellItem
                            key={cell.id}
                            id={cell.id}
                            count={cell.count}
                            player={cell.player}
                            exist={cell.exist}
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
