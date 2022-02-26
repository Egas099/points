/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="react-scripts" />

type Cell = {
    id: number;
    count: number;
    player: Player | null;
    allow: boolean;
};

interface GameState {
    mover: Player;
    moveBlock: boolean;
    endGame: boolean;
    gameStarted: boolean;
    players: PlayerProfile[];
    moveNumber: number;
}

interface SpawnPoint {
    x: number;
    y: number;
    player: Player;
}

type Vector2 = [x, y];
type x = number;
type y = number;

interface FieldTemplate {
    spawns: SpawnPoint[];
    field: number[][];
}
interface PlayerProfile {
    player: Player;
    entity: EmptyPlayer | LocalPlayer | AndroidPlayer;
}
interface EmptyPlayer {
    playerEntity: PlayerEntity.empty;
    id: string;
}
interface LocalPlayer {
    playerEntity: PlayerEntity.localPlayer;
    id: string;
}

interface AndroidPlayer {
    playerEntity: PlayerEntity.android;
    id: string;
}
interface GameForm {
    templateId: number;
    playersProfiles: PlayerProfile[];
}

interface Save {
    date: number;
    appVersion: string;
    state: SaveData;
}

interface GameSettings {
    botMovingDelay: number;
    cellCloningDelay: number;
}

interface SaveData {
    field: Cell[][];
    gameState: GameState;
}
