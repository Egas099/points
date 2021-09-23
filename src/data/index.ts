import { Player } from '../types';

export const spawnPoints: SpawnPoint[] = [
    { x: 1, y: 1, player: Player.red },
    { x: 5, y: 1, player: Player.orange },
    { x: 5, y: 5, player: Player.green },
    { x: 1, y: 5, player: Player.blue },
];

export const fieldSize = { x: 7, y: 7 }

// export const fieldTemplates = [
//     {
//         size: { x: 10, y: 10 },
//         spawns: [
//             { x: 1, y: 1, player: Player.blue },
//             { x: 2, y: 2, player: Player.red },

//         ]
//     }
// ]