import { Dispatch, FC, SetStateAction } from 'react'
import { getColorByPlayer } from '../../../data'
import { Player, PlayerStatus } from '../../../types'
import stl from './ChosePlayerButton.module.css'

interface Props {
    player: Player;
    playerStatus: [PlayerStatus, Dispatch<SetStateAction<PlayerStatus>>];
    position: "up" | "down";
}

const ChosePlayerButton: FC<Props> = ({ player, playerStatus, position }) => {
    const [status, setStatus] = [...playerStatus];

    function getIcon() {
        switch (status) {
            case PlayerStatus.none:
                return "?"
            case PlayerStatus.user:
                return "🙂"
            default:
                return `🤖`
        }
    }
    function nextStatus() {
        if (typeof PlayerStatus[status + 1] === "string")
            return setStatus(status + 1);
        return setStatus(PlayerStatus.none);
    }
    const getColorStyle = () => (status !== PlayerStatus.none) ? getColorByPlayer(player) : '';

    return (
        <div className={[stl[position], stl.wrapper].join(' ')}>
            <button
                className={[stl.content, getColorStyle()].join(' ')}
                onClick={() => nextStatus()}
            >
                {getIcon()}
            </button>
        </div>
    )
}

export default ChosePlayerButton
