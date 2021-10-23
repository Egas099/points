import { FC } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import stl from './CellItem.module.css';
import { getColorByPlayer } from '../../../logic/functions';

interface Props {
    cell: Cell;
    onMove?: Function;
}

const CellItem: FC<Props> = ({ cell, onMove }) => {
    const gameState = useTypedSelector(state => state.gameState)

    const createPoints = (count: number) => {
        switch (count) {
            case 0: return '';
            case 1: return <>•</>
            case 2: return <>•&nbsp;•</>
            case 3: return <>•<br />•&nbsp;•</>
            case 4: return <>•&nbsp;•<br />•&nbsp;•</>
            case 5: return <>•&nbsp;•<br />•<br />•&nbsp;•</>
            default: return '';
        }
    }

    if (cell.count === 0) (<div className={stl.wrapper} draggable="false"></div>)
    return (
        <div className={
            [
                stl.wrapper,
                gameState.mover === cell.player && !gameState.moveBlock ? stl.mover : ''
            ].join(' ')}
            draggable="false"
        >
            {cell.allow &&
                <div
                    className={[stl.content, getColorByPlayer(cell.player)].join(' ')}
                    onClick={onMove && (() => onMove(cell))}
                    draggable="false"
                >
                    <span>
                        {createPoints(cell.count)}
                    </span>
                </div>
            }
        </div >
    )
}

export default CellItem
