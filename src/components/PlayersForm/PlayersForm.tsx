import { Dispatch, FC, SetStateAction, useState } from 'react'
import { PlayerStatus } from '../../types'
import ChosePlayerButton from './ChosePlayerButton/ChosePlayerButton'
import stl from './PlayersForm.module.css'

interface Props {
    onSubmit: Function;
    form: PlayerProfile[];
}

const PlayersForm: FC<Props> = ({ onSubmit, form, children }) => {
    const playersStatuses: [PlayerStatus, Dispatch<SetStateAction<PlayerStatus>>][] = [];
    playersStatuses.push(useState<PlayerStatus>(PlayerStatus.none))
    playersStatuses.push(useState<PlayerStatus>(PlayerStatus.none))
    playersStatuses.push(useState<PlayerStatus>(PlayerStatus.none))
    playersStatuses.push(useState<PlayerStatus>(PlayerStatus.none))

    function submit() {
        if (playersStatuses.filter((pStat) => pStat[0] !== PlayerStatus.none).length > 1) {
            onSubmit(form.map((player, i) => {
                return { ...form[i], status: playersStatuses[i][0] };
            }));
        }
    }

    return (
        <div className={stl.wrapper}>
            <div className={stl.content}>
                <div className={stl.row}>
                    <ChosePlayerButton key={0} player={form[0].player} playerStatus={playersStatuses[0]} />
                    <ChosePlayerButton key={1} player={form[1].player} playerStatus={playersStatuses[1]} />
                </div>
                {children}
                <div className={stl.row}>
                    <ChosePlayerButton key={2} player={form[2].player} playerStatus={playersStatuses[2]} />
                    <button className='btn' onClick={() => submit()}>Start!</button>
                    <ChosePlayerButton key={3} player={form[3].player} playerStatus={playersStatuses[3]} />
                </div>
            </div>
        </div>
    )
}

export default PlayersForm
