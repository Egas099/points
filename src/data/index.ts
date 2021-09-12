import { Player } from '../types';

export const spawnPoints: SpawnPoint[] = [
    { x: 1, y: 1, player: Player.red },
    { x: 6, y: 1, player: Player.orange },
    { x: 6, y: 6, player: Player.green },
    { x: 1, y: 6, player: Player.blue },
];

export const fieldSize = { x: 8, y: 8 }

// export const fieldTemplates = [
//     {
//         size: { x: 10, y: 10 },
//         spawns: [
//             { x: 1, y: 1, player: Player.blue },
//             { x: 2, y: 2, player: Player.red },

//         ]
//     }
// ]