import { trying } from '../../helpers/trying';

interface CellWithAllowing {
    exist: boolean;
}

export function isExistCellAtPosition<T extends CellWithAllowing>(
    field: T[][],
    pos: Vector2
) {
    const [x, y] = pos;
    return trying(
        () => field[x][y].exist,
        () => false
    );
}
