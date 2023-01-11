import React, { FC } from 'react';
import style from './CellItem.module.css';
import { getColorClassByPlayer as getCellColor } from '../../../utils/common';
import { Player } from '../../../data/enums';
import points from './points';

interface Props {
    id: number;
    count: number;
    player: Player;
    allow: boolean;
    isMover: boolean;
    move: (cell: Cell) => void;
}

const CellItem: FC<Props> = ({ id, count, player, allow, isMover, move }) => {
    const wrapperClasses = `${style.wrapper} ${isMover ? style.mover : ''}`;
    const contentClasses = `${style.content} ${getCellColor(player, count)}`;

    function onPlayerClick() {
        isMover && move({ id, player, count, allow });
    }

    return (
        <div className={wrapperClasses} draggable="false">
            {allow && (
                <div
                    className={contentClasses}
                    onClick={onPlayerClick}
                    draggable="false"
                >
                    <span>{points[count]}</span>
                </div>
            )}
        </div>
    );
};

export default React.memo(CellItem);
