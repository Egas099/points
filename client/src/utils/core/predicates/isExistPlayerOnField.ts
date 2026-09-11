import { Player } from '../../../types';

interface CellWithPlayer {
    player: Player | null;
}

export function isExistPlayerOnField(
    field: CellWithPlayer[][],
    player: Player
) {
    return field.some(row => row.some(cell => cell.player === player));
}
