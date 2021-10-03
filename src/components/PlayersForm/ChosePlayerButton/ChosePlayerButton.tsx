import { Dispatch, FC, SetStateAction } from 'react'
import { getColorByPlayer } from '../../../data'
import { Player, PlayerStatus } from '../../../types'
import stl from './ChosePlayerButton.module.css'

interface Props {
    player: Player;
    playerStatus: [PlayerStatus, Dispatch<SetStateAction<PlayerStatus>>]
}

const ChosePlayerButton: FC<Props> = ({ player, playerStatus }) => {
    const next = (player: PlayerStatus): PlayerStatus => {
        if (typeof PlayerStatus[player + 1] === "string")
            return player + 1;
        return PlayerStatus.none;
    }

    const getIcon = (pStatus: PlayerStatus) => {
        switch (pStatus) {
            case PlayerStatus.none:
                return "?"
            case PlayerStatus.user:
                return "☺"
            default:
                return "♠"
        }
    }

    return (
        <div>
            <button
                className={[stl.content, getColorByPlayer(player)].join(' ')}
                onClick={() => playerStatus[1](next(playerStatus[0]))}
            >
                {getIcon(playerStatus[0])}
            </button>
        </div>
    )
}

export default ChosePlayerButton
