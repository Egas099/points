import { FC } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import { playerMove } from '../../logic';
import { Player } from '../../types';
import stl from './CellItem.module.css';
import * as aC from '../../store/actionCreator'

interface Props {
    cell: Cell;
}

const CellItem: FC<Props> = ({ cell }) => {
    const dispatch = useDispatch();
    const gameState = useTypedSelector(state => state.gameState)

    const getColorClass = (player: Player) => Player[player] ? stl[Player[player]] : stl.none;

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

    function move() {
        if (!gameState.moveBlock && gameState.mover === cell.player) {
            dispatch(aC.playerMove(cell))
        }
    }

    if (cell.count === 0) (<div className={stl.wrapper} draggable="false"></div>)
    return (
        <div className={
            [stl.wrapper, gameState.mover === cell.player && !gameState.moveBlock ? stl.mover : ''].join(' ')}
            draggable="false"
        >
            <div
                className={[stl.content, getColorClass(cell.player)].join(' ')}
                onClick={() => move()}
                draggable="false"
            >
                <span>
                    {createPoints(cell.count)}
                </span>
            </div>
        </div >
    )
}

export default CellItem
