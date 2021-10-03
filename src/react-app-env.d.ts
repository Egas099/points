/// <reference types="react-scripts" />

type Cell = {
    id: number;
    count: number;
    player: Player | null;
    allow: boolean;
}

interface GameState {
    mover: Player;
    moveBlock: boolean;
    endGame: boolean;
    gameStarted: boolean;
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

type Vector2 = [x, y]
type x = number;
type y = number;

interface FieldTemplate {
    size: Vector2;
    spawns: SpawnPoint[];
    field: number[][];
}
interface PlayerProfile {
    player: Player;
    status: PlayerStatus;
}