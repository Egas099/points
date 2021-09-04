import React, { FC } from 'react'
import { useDispatch } from 'react-redux';
import { Cell, GameActions, playerMove } from '../../store/gameReducer'
import styles from './CellItem.module.css';

interface Props {
    cell: Cell;
}

const CellItem: FC<Props> = ({ cell }) => {
    const dispatch = useDispatch();

    const getColorClass = (number: number) => {
        switch (number) {
            case 1: return styles.one;
            case 2: return styles.two;
            case 3: return styles.three;
            default: return '';
        }
    }

    return (
        <div className={styles.wrapper}>
            <div
                className={[styles.content, getColorClass(cell.count)].join(' ')}
                onClick={() => dispatch(playerMove(cell.id))}
            >
            </div>
        </div>
    )
}

export default CellItem
