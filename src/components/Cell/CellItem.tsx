import { FC } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { cellIncrement, nextMover } from '../../store/gameReducer';
import { Player } from '../../types';
import styles from './CellItem.module.css';

interface Props {
    cell: Cell;
}

const CellItem: FC<Props> = ({ cell }) => {
    const dispatch = useDispatch();
    const state = useTypedSelector(state => state.game)

    const getColorClass = (player: Player) => {
        switch (player) {
            case undefined: return styles.none;
            case Player.blue: return styles.blue;
            case Player.red: return styles.red;
            default: return '';
        }
    }

    const click = () => {
        if (state.mover === cell.player) {
            dispatch(cellIncrement(cell.id))
            dispatch(nextMover());
        }
    }

    return (
        <div className={styles.wrapper} draggable="false">
            <div
                className={[styles.content, getColorClass(cell.player)].join(' ')}
                onClick={click}
                draggable="false"
            >
                {cell.count === 0 ? '' : cell.count}
            </div>
        </div>
    )
}

export default CellItem
