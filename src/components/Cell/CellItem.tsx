import { FC } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { blockMoving, cellIncrement, nextMover } from '../../store/gameReducer';
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
            case Player.red: return styles.red;
            case Player.orange: return styles.orange;
            case Player.yellow: return styles.yellow;
            case Player.green: return styles.green;
            case Player.blue: return styles.blue;
            default: return '';
        }
    }

    const click = () => {
        if (state.moveBlock) return;
        if (state.mover === cell.player) {
            dispatch(cellIncrement(cell.id))

            dispatch(blockMoving())
        }
    }
    const createPoints = (count: number) => {
        switch (count) {
            case 0:
                return '';
            case 3:
                return <><span>•</span><br /><span>•</span><span>•</span></>
            case 4:
                return <><span>•</span><span>•</span><br /><span>•</span><span>•</span></>
            default:
                return new Array(count).fill(' • ').join(' ');
        }
    }

    return (
        <div className={[styles.wrapper, state.mover === cell.player && !state.moveBlock ? styles.mover : ''].join(' ')} draggable="false">
            <div
                className={[styles.content, getColorClass(cell.player)].join(' ')}
                onClick={click}
                draggable="false"
            >
                <p>
                    {createPoints(cell.count)}
                </p>
            </div>
        </div>
    )
}

export default CellItem
