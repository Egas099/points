import { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import style from './CellItem.module.css';
import { getColorClassByPlayer } from '../../../logic/common';

interface Props {
    cell: Cell;
    onMove?: (cell: Cell) => void;
}

const CellItem: FC<Props> = ({ cell, onMove }) => {
    const gameState = useTypedSelector(state => state.gameState);

    const createPoints = (count: number) => {
        switch (count) {
            case 0:
                return '';
            case 1:
                return <>•</>;
            case 2:
                return <>•&nbsp;•</>;
            case 3:
                return (
                    <>
                        •<br />
                        •&nbsp;•
                    </>
                );
            case 4:
                return (
                    <>
                        •&nbsp;•
                        <br />
                        •&nbsp;•
                    </>
                );
            case 5:
                return (
                    <>
                        •&nbsp;•
                        <br />•<br />
                        •&nbsp;•
                    </>
                );
            default:
                return '';
        }
    };

    if (cell.count === 0)
        <div className={style.wrapper} draggable="false"></div>;
    return (
        <div
            className={[
                style.wrapper,
                gameState.mover === cell.player && !gameState.moveBlock
                    ? style.mover
                    : ''
            ].join(' ')}
            draggable="false"
        >
            {cell.allow && (
                <div
                    className={[
                        style.content,
                        getColorClassByPlayer(cell.player, cell.count)
                    ].join(' ')}
                    onClick={onMove && (() => onMove(cell))}
                    draggable="false"
                >
                    <span>{createPoints(cell.count)}</span>
                </div>
            )}
        </div>
    );
};

export default CellItem;
