import { Player, PlayerEntity } from '../data/enums';
import colors from '../css/colors.module.css';
import { fieldTemplates } from '../data/fieldTemplates';
import { COLOR_INTENSITIES } from '../data/constants';

export const find = {
    overflowingCell: (field: Cell[][]) => {
        for (const row of field) {
            const cell = row.find(cell => cell.count > 3);
            if (cell) return cell;
        }
    },
    cellsByPlayer: (field: Cell[][], player: Player): Cell[] => {
        let responce: Cell[] = [];
        for (const row of field) {
            const cell = row.filter(cell => cell.player === player);
            if (cell.length > 0) responce = responce.concat(cell);
        }
        return responce;
    }
};

export const isExist = {
    playerOnField: (field: Cell[][], player: Player) =>
        field.some(row =>
            row.some(cell => cell.player === player) ? true : false
        )
};

export const random = {
    elemetFrom: (object: Array<any>): any => {
        if (Array.isArray(object))
            return object[Math.floor(Math.random() * object.length)];

        throw new Error('The argument is not an array.');
    }
};

export const filter = {
    cellsByCount: (cells: Cell[], count: number) =>
        cells.filter(cell => cell.count === count)
};

export function trying(func: () => any, onCatch: any) {
    try {
        return func();
    } catch (e) {
        return onCatch;
    }
}

export function upFirst(str: string) {
    return str[0].toUpperCase() + str.slice(1, str.length);
}

export function cellIsExist(field: Cell[][], pos: Vector2) {
    const [x, y] = pos;
    if (trying(() => field[x][y].allow, undefined)) return true;
    else return false;
}

export function getColorByPlayer(player: Player, count = 3) {
    const intensity = COLOR_INTENSITIES[count];
    return intensity
        ? colors[`${Player[player]}-${intensity}`]
        : colors[Player[player]];
}

export function findTemplateById(id: number) {
    return fieldTemplates[id];
}

export function filterEmptyPlayers(profiles: PlayerProfile[]) {
    return profiles.filter(
        profile => profile.entity.playerEntity !== PlayerEntity.empty
    );
}

export function extractPlayersFromTemplate(templateId: number) {
    return Array.from(
        new Set(findTemplateById(templateId).spawns.map(spawn => spawn.player))
    );
}

export function createProfile(player: Player): PlayerProfile {
    return {
        player: player,
        entity: {
            playerEntity: PlayerEntity.empty,
            id: ''
        }
    };
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
