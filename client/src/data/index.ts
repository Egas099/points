import { Player } from '../types';
import AI from '../logic/AI';

export const fieldTemplates: FieldTemplate[] = [
    {
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

export const gameSettings: GameSettings = {
    template: fieldTemplates[0],
    playersProfiles: [],
    bots: {
        red: AI.getBot('normal'),
        orange: AI.getBot('normal'),
        green: AI.getBot('normal'),
        blue: AI.getBot('normal'),
    }
}



