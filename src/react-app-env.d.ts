/// <reference types="react-scripts" />

type Cell = {
    id: number;
    count: number;
    player: Player | undefined;
}

interface GameState {
    field: Cell[][],
    mover: Player;
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