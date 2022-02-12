import { Dispatch, FC, SetStateAction, useState } from 'react';
import { PlayerStatus } from '../../types';
import ChosePlayerButton from './ChosePlayerButton/ChosePlayerButton';
import stl from './PlayersForm.module.css';

interface Props {
    onSubmit: (form: PlayerProfile[]) => void;
    form: PlayerProfile[];
}

const PlayersForm: FC<Props> = ({ onSubmit, form, children }) => {
    const playersStatuses: [
        PlayerStatus,
        Dispatch<SetStateAction<PlayerStatus>>
    ][] = [];
    playersStatuses.push(useState<PlayerStatus>(PlayerStatus.none));
    playersStatuses.push(useState<PlayerStatus>(PlayerStatus.none));
    playersStatuses.push(useState<PlayerStatus>(PlayerStatus.none));
    playersStatuses.push(useState<PlayerStatus>(PlayerStatus.none));

    function submit() {
        if (
            playersStatuses.filter(pStat => pStat[0] !== PlayerStatus.none)
                .length > 1
        ) {
            onSubmit(
                form.map((player, i) => ({
                    ...form[i],
                    status: playersStatuses[i][0]
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
                        player={form[0].player}
                        playerStatus={playersStatuses[0]}
                        position={'up'}
                    />
                    <ChosePlayerButton
                        key={1}
                        player={form[1].player}
                        playerStatus={playersStatuses[1]}
                        position={'up'}
                    />
                </div>
                {children}
                <div className={stl.row}>
                    <ChosePlayerButton
                        key={2}
                        player={form[2].player}
                        playerStatus={playersStatuses[2]}
                        position={'down'}
                    />
                    <ChosePlayerButton
                        key={3}
                        player={form[3].player}
                        playerStatus={playersStatuses[3]}
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
