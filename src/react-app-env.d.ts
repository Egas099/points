/// <reference types="react-scripts" />

type Cell = {
    id: number;
    count: number;
    player: Player | null;
}

interface GameState {
    mover: Player;
    moveBlock: boolean;
    endGame: boolean;
    players: Player[];
    moveNumber: number;
}
interface GameField {
    field: Cell[][],
}

interface SpawnPoint {
    x: number;
    y: number;
    player: Player;
}

interface Vector2 {
    x: number;
    y: number;
}