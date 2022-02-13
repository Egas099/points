import { Player, PlayerEntity } from '../types';
import colors from '../css/colors.module.css';
import { fieldTemplates } from '../data/templates';

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

export function getColorByPlayer(player: Player) {
    return colors[Player[player]];
}

export function findTemplateById(id: number) {
    return fieldTemplates[id]
}

export function filterEmptyPlayers(profiles: PlayerProfile[]) {
    return profiles.filter(
        profile => profile.entity.playerEntity !== PlayerEntity.empty
    );
}
