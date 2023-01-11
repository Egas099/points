import { Player, PlayerEntity } from '../data/enums';
import colors from '../css/colorClasses.module.css';
import { fieldTemplates } from '../data/fieldTemplates';
import { COLOR_INTENSITIES } from '../data/constants';

export function findOverflowingCell(field: Cell[][]) {
    for (const row of field) {
        const cell = row.find(cell => cell.count > 3);
        if (cell) return cell;
    }
}

export function isExistPlayerOnField(field: Cell[][], player: Player) {
    return field.some(row => row.some(cell => cell.player === player));
}

export function trying<A,T>(func: () => A, onCatch: T) {
    try {
        return func();
    } catch (e) {
        return onCatch;
    }
}

export function upFirst(str: string) {
    return str[0].toUpperCase() + str.slice(1, str.length);
}

export function isExistCell(field: Cell[][], pos: Vector2) {
    const [x, y] = pos;
    if (trying(() => field[x][y].allow, undefined)) return true;
    else return false;
}

export function getColorClassByPlayer(player: Player, count = 3) {
    const intensity = COLOR_INTENSITIES[count];
    return intensity
        ? colors[`${Player[player]}-${intensity}`]
        : colors[Player[player]];
}

export function getTemplateById(id: number) {
    return fieldTemplates[id];
}

export function getPlayersFromTemplate(templateId: number) {
    return Array.from(
        new Set(getTemplateById(templateId).spawns.map(spawn => spawn.player))
    );
}

export function getIconByPlayerEntity(entity: PlayerEntity): string {
    switch (entity) {
        case PlayerEntity.empty:
            return '?';
        case PlayerEntity.localPlayer:
            return '🙂';
        default:
            return '🤖';
    }
}

export function objectEquals(objA: object, objB: object): boolean{
    return JSON.stringify(objA) === JSON.stringify(objB);
}

export function getFormattedDate(time: number) {
    return new Date(time).toLocaleString().split(', ').reverse().join(', ');
}
