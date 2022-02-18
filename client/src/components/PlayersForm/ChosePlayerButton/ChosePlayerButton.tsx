import { FC, useEffect, useState } from 'react';
import { PlayerEntity } from '../../../data/enums';
import styles from './ChosePlayerButton.module.css';
import { getColorByPlayer } from '../../../logic/common';

interface Props {
    profile: PlayerProfile;
    changeEntity: () => void;
    position: 'up' | 'down';
}

const ChosePlayerButton: FC<Props> = ({ profile, changeEntity, position }) => {
    const [entity, setEntity] = useState(0);
    useEffect(loadEntity);

    function loadEntity() {
        const newEntity = profile?.entity?.playerEntity;
        setEntity(newEntity ? newEntity : 0);
    }

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

    const getColorClass = () =>
        entity !== PlayerEntity.empty ? getColorByPlayer(profile.player) : '';

    return (
        <div className={styles[position]}>
            <button className={getColorClass()} onClick={changeEntity}>
                {getIcon()}
            </button>
        </div>
    );
};

export default ChosePlayerButton;
