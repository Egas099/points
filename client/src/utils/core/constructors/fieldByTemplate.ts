import { FIELD_WIDTH, FIELD_HEIGHT } from "../../../data/constants";
import { Player } from "../../../data/enums";

const createCell = (id: number) => ({
    id: id,
    count: 0,
    player: null,
    exist: true
});
const createEmptyCell = (id: number) => ({
    id: id,
    count: 0,
    player: null,
    exist: false
});
const emptyField = (width: number, height: number): Cell[][] =>
    new Array(height).fill(0).map(() => new Array(width).fill(0));

export const fieldByTemplate = (
    fieldTemplate: FieldTemplate,
    players: Player[] = []
) => {
    const newField = emptyField(FIELD_WIDTH, FIELD_HEIGHT);
    const spawnPoints = players.length
        ? fieldTemplate.spawns.filter(spawn =>
              players.some(player => spawn.player === player)
          )
        : fieldTemplate.spawns;

    for (let i = 0; i < FIELD_WIDTH; i++) {
        for (let j = 0; j < FIELD_HEIGHT; j++) {
            if (fieldTemplate.field[i][j]) {
                newField[i][j] = createCell(i * FIELD_WIDTH + j);
            } else {
                newField[i][j] = createEmptyCell(i * FIELD_WIDTH + j);
            }
        }
    }
    spawnPoints.forEach(spawn => {
        newField[spawn.y][spawn.x].player = spawn.player;
        newField[spawn.y][spawn.x].count = 3;
    });

    return newField;
};




