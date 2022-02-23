import { FIELD_HEIGHT, FIELD_WIDTH } from '../data/constants';
import { Player, PlayerEntity } from '../data/enums';
import { getTemplateById } from './common';

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

export const fieldByTemplate = (
    fieldTemplate: FieldTemplate,
    players: Player[] | false = false
) => {
    const newField = emptyField(FIELD_WIDTH, FIELD_HEIGHT);
    const spawnPoints = players
        ? fieldTemplate.spawns.filter(spawn =>
              players.some(player => spawn.player === player)
          )
        : fieldTemplate.spawns;

    for (let i = 0; i < FIELD_WIDTH; i++) {
        for (let j = 0; j < FIELD_HEIGHT; j++) {
            if (fieldTemplate.field[i][j]) {
                newField[i][j] = cell(i * FIELD_WIDTH + j);
            } else {
                newField[i][j] = emptyCell(i * FIELD_WIDTH + j);
            }
        }
    }
    spawnPoints.forEach(spawn => {
        newField[spawn.y][spawn.x].player = spawn.player;
        newField[spawn.y][spawn.x].count = 3;
    });

    return newField;
};

export const createFieldByTemplateId = (templateId: number): Cell[][] => {
    const template = getTemplateById(templateId);
    return fieldByTemplate(template);
};

export const assembleField = (gameSettings: GameSettings): Cell[][] => {
    const template = getTemplateById(gameSettings.templateId);
    const existPlayers = gameSettings.playersProfiles.map(
        player => player.player
    );
    return fieldByTemplate(template, existPlayers);
};

export function createProfile(player: Player): PlayerProfile {
    return {
        player: player,
        entity: {
            playerEntity: PlayerEntity.empty,
            id: ''
        }
    };
}
