import { FIELD_HEIGHT, FIELD_WIDTH } from '../data/constants';
import { findTemplateById } from './common';

export const cell = (id: number) => ({
    id: id,
    count: 0,
    player: null,
    allow: true
});
export const emptyCell = (id: number) => ({
    id: id,
    count: 0,
    player: null,
    allow: false
});
export const emptyField = (width: number, height: number): Cell[][] =>
    new Array(height)
        .fill(1)
        .map((a, i) =>
            new Array(width).fill(1).map((b, j) => cell(i * width + j))
        );

export const spawnPoint = (field: Cell[][], spawnPoints: SpawnPoint[]) => {
    const newField = field;
    spawnPoints.forEach(spawn => {
        newField[spawn.y][spawn.x].player = spawn.player;
        newField[spawn.y][spawn.x].count = 3;
    });
    return newField;
};
export const fieldByTemplate = (fieldTemplate: FieldTemplate) => {
    const [sizeX, sizeY] = [FIELD_WIDTH, FIELD_HEIGHT];
    const newField = emptyField(sizeX, sizeY);

    for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
            if (fieldTemplate.field[i][j]) {
                newField[i][j] = cell(i * sizeX + j);
            } else {
                newField[i][j] = emptyCell(i * sizeX + j);
            }
        }
    }
    return newField;
};

export const createFieldByTemplateId = (templateId: number): Cell[][] => {
    const template = findTemplateById(templateId);
    const field = spawnPoint(fieldByTemplate(template), template.spawns);
    return field;
};
