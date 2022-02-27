import { FC, useEffect, useState } from 'react';
import { PlayerEntity } from '../../../data/enums';
import styles from './ChosePlayerButton.module.css';
import {
    getColorClassByPlayer,
    getIconByPlayerEntity
} from '../../../functions/common';

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

    const getColorClass = () =>
        entity !== PlayerEntity.empty
            ? getColorClassByPlayer(profile.player)
            : '';

    return (
        <div className={styles[position]}>
            <button className={getColorClass()} onClick={changeEntity}>
                {getIconByPlayerEntity(entity)}
            </button>
        </div>
    );
};

export default ChosePlayerButton;
