import { Player } from '../types';
import colors from '../css/colors.module.css';
import AI from '../logic/AI';
import { random } from '../logic/functions';

export const fieldTemplates: FieldTemplate[] = [
    {
        size: [9, 9],
        field: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        spawns: [
            { x: 1, y: 1, player: Player.red },
            { x: 7, y: 1, player: Player.orange },
            { x: 1, y: 7, player: Player.blue },
            { x: 7, y: 7, player: Player.green },
        ]
    },
    {
        size: [9, 9],
        field: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        spawns: [
            { x: 2, y: 2, player: Player.red },
            { x: 6, y: 2, player: Player.orange },
            { x: 2, y: 6, player: Player.blue },
            { x: 6, y: 6, player: Player.green },
        ]
    },
    {
        size: [9, 9],
        field: [
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
        spawns: [
            { x: 1, y: 1, player: Player.red },
            { x: 7, y: 1, player: Player.orange },
            { x: 1, y: 7, player: Player.blue },
            { x: 7, y: 7, player: Player.green },
        ]
    },
    {
        size: [9, 9],
        field: [
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
        ],
        spawns: [
            { x: 1, y: 1, player: Player.red },
            { x: 7, y: 1, player: Player.orange },
            { x: 1, y: 7, player: Player.blue },
            { x: 7, y: 7, player: Player.green },
        ]
    },
    {
        size: [9, 9],
        field: [
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [0, 1, 1, 0, 0, 0, 1, 1, 0],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
        ],
        spawns: [
            { x: 1, y: 1, player: Player.red },
            { x: 7, y: 1, player: Player.orange },
            { x: 1, y: 7, player: Player.blue },
            { x: 7, y: 7, player: Player.green },
        ]
    },
    {
        size: [9, 9],
        field: [
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
        ],
        spawns: [
            { x: 1, y: 1, player: Player.red },
            { x: 7, y: 1, player: Player.orange },
            { x: 1, y: 7, player: Player.blue },
            { x: 7, y: 7, player: Player.green },
        ]
    },
]

export const profileData: PlayerData[] = []

interface PlayerData {
    name: string;
    player: Player;
    isUser: boolean;
}

export const gameSettings: GameSettings = {
    template: fieldTemplates[0],
    playersProfiles: [],
    bots: {
        red: AI.getBot(random.elemetFrom(['normal', 'simple'])),
        orange: AI.getBot(random.elemetFrom(['normal', 'simple'])),
        green: AI.getBot(random.elemetFrom(['normal', 'simple'])),
        blue: AI.getBot(random.elemetFrom(['normal', 'simple'])),
    }
}

export function getColorByPlayer(player: Player) {
    return colors[Player[player]];
}

interface GameSettings {
    template: FieldTemplate,
    playersProfiles: PlayerProfile[],
    bots: Bots,
}

interface Bots {
    red: Function;
    orange: Function;
    green: Function;
    blue: Function;
}