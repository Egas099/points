import { Player } from '../types';

// export const spawnPoints: SpawnPoint[] = [
//     { x: 1, y: 1, player: Player.red },
//     { x: 13, y: 1, player: Player.orange },
//     { x: 13, y: 13, player: Player.green },
//     { x: 1, y: 13, player: Player.blue },
//     { x: 7, y: 7, player: Player.yellow },
// ];

export const spawnPoints: SpawnPoint[] = [
    { x: 1, y: 1, player: Player.red },
    { x: 4, y: 1, player: Player.orange },
    { x: 4, y: 4, player: Player.green },
    { x: 1, y: 4, player: Player.blue },
    // { x: 3, y: 3, player: Player.yellow },
];
export const fieldSize = { x: 11, y: 11 }
// export const fieldSize = { x: 15, y: 15 }

// export const fieldTemplates = [
//     {
//         size: { x: 10, y: 10 },
//         spawns: [
//             { x: 1, y: 1, player: Player.blue },
//             { x: 2, y: 2, player: Player.red },

//         ]
//     }
// ]