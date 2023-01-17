import { Player } from '../../data/enums';
import colors from '../../css/colorClasses.module.css';
import { COLOR_INTENSITIES } from '../../data/constants';

export function getColorClassByPlayer(player: Player, count = 3) {
    const intensity = COLOR_INTENSITIES[count];
    return intensity
        ? colors[`${Player[player]}-${intensity}`]
        : colors[Player[player]];
}
