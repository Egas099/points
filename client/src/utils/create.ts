import { APP_VERSION, FIELD_HEIGHT, FIELD_WIDTH } from '../data/constants';
import { Player, PlayerEntity } from '../data/enums';
import { RootState } from '../store';
import { getTemplateById } from './common';

const cell = (id: number) => ({
    id: id,
    count: 0,
    player: null,
    allow: true
});
const emptyCell = (id: number) => ({
    id: id,
    count: 0,
    player: null,
    allow: false
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

export const assembleField = (gameForm: GameForm): Cell[][] => {
    const template = getTemplateById(gameForm.templateId);
    const existPlayers = gameForm.playersProfiles.map(player => player.player);
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

export function createGameSettings(
    botMovingDelay: number,
    cellCloningDelay: number
) {
    return {
        botMovingDelay: botMovingDelay,
        cellCloningDelay: cellCloningDelay
    };
}

export const createSave = (state: RootState): Save => ({
    date: Date.now(),
    appVersion: APP_VERSION,
    state: {
        field: state.field,
        gameState: state.gameState
    }
});
