import { FC } from 'react'
import CellItem from '../Cell/CellItem'
import styles from './GameField.module.css'

interface Props {
    field: Cell[][],
}

const GameField: FC<Props> = ({ field }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {field.map(row => (
                    <div className={styles.row} key={Math.random()}>
                        {row.map((cell) => (
                            <CellItem cell={cell} key={cell.id}></CellItem>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameField