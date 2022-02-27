import { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import style from './CellItem.module.css';
import { getColorClassByPlayer } from '../../../functions/common';
import { PlayerEntity } from '../../../data/enums';

interface Props {
    cell: Cell;
    move?: (cell: Cell) => void;
}

const CellItem: FC<Props> = ({ cell, move }) => {
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
                return '!';
        }
    };

    function onClick() {
        const profile = gameState.players.find(
            profile => profile.player === cell.player
        );
        if (
            profile?.entity.playerEntity === PlayerEntity.localPlayer &&
            !gameState.moveBlock &&
            gameState.gameStarted &&
            gameState.mover === cell.player
        ) {
            move && move(cell);
        }
    }

    const wrapperClasses = `${style.wrapper} 
    ${
        gameState.mover === cell.player && !gameState.moveBlock
            ? style.mover
            : ''
    }`;

    const contentClasses = `${style.content}
    ${getColorClassByPlayer(cell.player, cell.count)}`;

    return (
        <div className={wrapperClasses} draggable="false">
            {cell.allow && (
                <div
                    className={contentClasses}
                    onClick={onClick}
                    draggable="false"
                >
                    <span>{createPoints(cell.count)}</span>
                </div>
            )}
        </div>
    );
};

export default CellItem;
