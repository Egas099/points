import { FC } from 'react';
import CellItem from './Cell/CellItem';
import styles from './GameField.module.css';

interface Props {
    field: Cell[][];
    move?: (cell: Cell) => void;
}

const GameField: FC<Props> = ({ field, move }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {field.map((row, i) => (
                    <div className={styles.row} key={i}>
                        {row.map(cell => (
                            <CellItem cell={cell} key={cell.id} move={move} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameField;
