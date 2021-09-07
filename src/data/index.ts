import { Player } from '../types';

export const spawnPoints: SpawnPoint[] = [
    { x: 1, y: 1, player: Player.red },
    { x: 3, y: 3, player: Player.blue },
];

export const fieldSize = { x: 5, y: 5 }

export const fieldTemplates = [
    {
        size: { x: 5, y: 5 },
        spawns: [
            { x: 1, y: 1, player: Player.blue },
            { x: 2, y: 2, player: Player.red },
        ]
    }
]