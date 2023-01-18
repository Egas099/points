import { Player } from '../../data/enums';
import colors from '../../css/colorClasses.module.css';

const COLOR_INTENSITIES = [
    '',
    'low',
    'medium',
    'high',
    'overflow',
    'overflow'
];

export function getColorClassByPlayer(player: Player, count = 3) {
    const intensity = COLOR_INTENSITIES[count];
    return intensity
        ? colors[`${Player[player]}-${intensity}`]
        : colors[Player[player]];
}
