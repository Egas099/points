import { FC } from 'react';
import { Player, PlayerEntity } from '../../../types';
import stl from './ChosePlayerButton.module.css';
import { getColorByPlayer } from '../../../logic/common';

interface Props {
    player: Player;
    playerEntity: [PlayerEntity, () => void];
    position: 'up' | 'down';
}

const ChosePlayerButton: FC<Props> = ({ player, playerEntity, position }) => {
    const [entity, setEntity] = playerEntity;

    function getIcon() {
        switch (entity) {
            case PlayerEntity.empty:
                return '?';
            case PlayerEntity.localPlayer:
                return '🙂';
            default:
                return '🤖';
        }
    }

    const getColorStyle = () =>
        entity !== PlayerEntity.empty ? getColorByPlayer(player) : '';

    return (
        <div className={[stl[position], stl.wrapper].join(' ')}>
            <button
                className={[stl.content, getColorStyle()].join(' ')}
                onClick={() => setEntity()}
            >
                {getIcon()}
            </button>
        </div>
    );
};

export default ChosePlayerButton;
