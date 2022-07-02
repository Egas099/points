import { FC, useEffect, useState } from 'react';
import AI from '../../functions/AI';
import { PlayerEntity } from '../../data/enums';
import ChosePlayerButton from './ChosePlayerButton/ChosePlayerButton';
import styles from './PlayersForm.module.css';
import GameField from '../GameField/GameField';
import { createProfile, fieldByTemplate } from '../../functions/create';
import {
    getPlayersFromTemplate,
    getTemplateById
} from '../../functions/common';

interface Props {
    onSubmit: (form: GameForm) => void;
    templates: FieldTemplate[];
}

const PlayersForm: FC<Props> = ({ onSubmit, templates }) => {
    const [selectedTemplateId, setSelectedTemplateId] = useState(0);
    const [profiles, setProfiles] = useState<PlayerProfile[]>(loadProfiles());

    useEffect(updateProfiles, [selectedTemplateId]);

    const nextEntity = (entity: PlayerEntity): PlayerEntity =>
        typeof PlayerEntity[entity + 1] === 'string'
            ? entity + 1
            : PlayerEntity.empty;

    const filterExistingEntity = (prof: PlayerProfile[]) =>
        prof.filter(e => e.entity.playerEntity !== PlayerEntity.empty);

    function setTemplateId(count: number) {
        const newTemplateIndex =
            (selectedTemplateId + count + templates.length) % templates.length;

        setSelectedTemplateId(newTemplateIndex);
    }

    function loadProfiles() {
        const players = getPlayersFromTemplate(selectedTemplateId);
        const profiles = players.map(profile => createProfile(profile));
        return profiles;
    }

    function updateProfiles() {
        setProfiles(loadProfiles());
    }

    function setEntity(index: number) {
        return () => {
            const newProfiles = [...profiles];
            newProfiles[index].entity.playerEntity = nextEntity(
                newProfiles[index].entity.playerEntity
            );
            setProfiles(newProfiles);
        };
    }

    function assignAI(profiles: PlayerProfile[]) {
        return profiles.map(profile => {
            if (profile.entity.playerEntity === PlayerEntity.android) {
                const newProfile = profile;
                newProfile.entity.id = AI.getRandomBot('normal');
                return newProfile;
            } else {
                return profile;
            }
        });
    }

    function submit() {
        let existPlayersProfiles = filterExistingEntity(profiles);
        if (existPlayersProfiles.length > 1) {
            existPlayersProfiles = assignAI(existPlayersProfiles);
            onSubmit({
                templateId: selectedTemplateId,
                playersProfiles: existPlayersProfiles
            });
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.row}>
                    <ChosePlayerButton
                        key={0}
                        player={profiles[0].player}
                        entity={profiles[0].entity.playerEntity}
                        changeEntity={setEntity(0)}
                        position="up"
                    />
                    <ChosePlayerButton
                        key={1}
                        player={profiles[1].player}
                        entity={profiles[1].entity.playerEntity}
                        changeEntity={setEntity(1)}
                        position={'up'}
                    />
                </div>
                <button
                    className={styles.leftSwitch}
                    onClick={() => setTemplateId(-1)}
                >{`<`}</button>
                <button
                    className={styles.rightSwitch}
                    onClick={() => setTemplateId(1)}
                >{`>`}</button>
                <GameField
                    field={fieldByTemplate(getTemplateById(selectedTemplateId))}
                    move={() => undefined}
                />
                <div className={styles.row}>
                    <ChosePlayerButton
                        key={3}
                        player={profiles[3].player}
                        entity={profiles[3].entity.playerEntity}
                        changeEntity={setEntity(3)}
                        position={'down'}
                    />
                    <ChosePlayerButton
                        key={2}
                        player={profiles[2].player}
                        entity={profiles[2].entity.playerEntity}
                        changeEntity={setEntity(2)}
                        position={'down'}
                    />
                </div>
                <button className={styles.startButton} onClick={submit}>
                    {filterExistingEntity(profiles).length > 1 ? '▶' : ''}
                </button>
            </div>
        </div>
    );
};

export default PlayersForm;
