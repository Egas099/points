import { FC, useState } from 'react';
import AI from '../../logic/AI';
import { Player, PlayerEntity } from '../../types';
import ChosePlayerButton from './ChosePlayerButton/ChosePlayerButton';
import stl from './PlayersForm.module.css';

interface Props {
    onSubmit: (form: PlayerProfile[]) => void;
    players: Player[];
}

const PlayersForm: FC<Props> = ({ onSubmit, players, children }) => {
    const [playersEntity, setPlayersEntity] = useState<PlayerEntity[]>([
        PlayerEntity.empty,
        PlayerEntity.empty,
        PlayerEntity.empty,
        PlayerEntity.empty
    ]);

    const setEntity = (index: number) => () =>
        setPlayersEntity(
            playersEntity.map((entity: PlayerEntity, i) =>
                i === index ? nextStatus(entity) : entity
            )
        );

    const nextStatus = (status: PlayerEntity): PlayerEntity =>
        typeof PlayerEntity[status + 1] === 'string'
            ? status + 1
            : PlayerEntity.empty;

    function submit() {
        if (
            playersEntity.filter(pStat => pStat !== PlayerEntity.empty).length >
            1
        ) {
            onSubmit(
                players.map((player, i) => ({
                    player: player,
                    entity: {
                        playerEntity: playersEntity[i],
                        id:
                            playersEntity[i] === PlayerEntity.android
                                ? AI.getRandonBot('normal')
                                : ''
                    }
                }))
            );
        }
    }

    return (
        <div className={stl.wrapper}>
            <div className={stl.content}>
                <div className={stl.row}>
                    <ChosePlayerButton
                        key={0}
                        player={players[0]}
                        playerEntity={[playersEntity[0], setEntity(0)]}
                        position={'up'}
                    />
                    <ChosePlayerButton
                        key={1}
                        player={players[1]}
                        playerEntity={[playersEntity[1], setEntity(1)]}
                        position={'up'}
                    />
                </div>
                {children}
                <div className={stl.row}>
                    <ChosePlayerButton
                        key={2}
                        player={players[2]}
                        playerEntity={[playersEntity[2], setEntity(2)]}
                        position={'down'}
                    />
                    <ChosePlayerButton
                        key={3}
                        player={players[3]}
                        playerEntity={[playersEntity[3], setEntity(3)]}
                        position={'down'}
                    />
                </div>
                <button
                    className={['btn ', stl.button].join(' ')}
                    onClick={() => submit()}
                >
                    Start!
                </button>
            </div>
        </div>
    );
};

export default PlayersForm;
