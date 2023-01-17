import { FC } from 'react';
import { Player, PlayerEntity } from '../../../data/enums';
import styles from './ChosePlayerButton.module.css';
import { getColorClassByPlayer } from '../../../utils/helpers/getColorClassByPlayer';
import { ENTITY_ICONS } from '../../../data/constants';

interface Props {
    player: Player;
    entity: PlayerEntity;
    changeEntity: () => void;
    position: 'up' | 'down';
}

const ChosePlayerButton: FC<Props> = ({
    player,
    entity,
    changeEntity,
    position
}) => {
    const getColorClass = () =>
        entity !== PlayerEntity.empty ? getColorClassByPlayer(player) : '';

    return (
        <div className={styles[position]}>
            <button className={getColorClass()} onClick={changeEntity}>
                {ENTITY_ICONS[entity]}
            </button>
        </div>
    );
};

export default ChosePlayerButton;
