import React from 'react'
import { FC } from 'react'
import { Cell } from '../../store/gameReducer'
import CellItem from '../Cell/CellItem'
import styles from './GameField.module.css'

interface Props {
    field: Cell[][],
}

const GameField: FC<Props> = ({ field }) => {
    return (
        <div className={styles.wrapper}>
            {field.map(row => (
                <div className={styles.row} key={Math.random()}>
                    {row.map((cell) => (
                        <CellItem cell={cell} key={cell.id}></CellItem>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default GameField
