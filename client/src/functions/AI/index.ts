import { Player } from '../../data/enums';
import { RootState } from '../../store';
import { randomElemetFrom } from '../aiHelpers';
import normalBots from './normal';
import simpleBots from './simple';

type Difficulty = 'simple' | 'normal';
export interface BotProfile {
    name: string;
    implementation: (state: RootState, ownCells: Cell[]) => Cell;
    description: string;
    difficulty: Difficulty;
}

const AI = {
    getRandomBot: function (difficulty: Difficulty): string {
        return randomElemetFrom(
            AI_PROFILES.filter(bot => bot.difficulty === difficulty)
        ).name;
    },
    getBotById: function (id: string): BotProfile | undefined {
        return AI_PROFILES.find(bot => bot.name === id);
    },
    getBotMoveById: function (id: string, state: RootState) {
        const botImplementation = AI_PROFILES.find(
            bot => bot.name === id
        )?.implementation;

        const ownCells = () =>
            findCellsByPlayer(state.field, state.gameState.mover);

        return botImplementation
            ? botImplementation(state, ownCells())
            : randomElemetFrom(AI_PROFILES).implementation(state, ownCells());
    }
};
export default AI;

const AI_PROFILES: BotProfile[] = [simpleBots, normalBots].flat();

function findCellsByPlayer(field: Cell[][], player: Player) {
    let responce: Cell[] = [];
    for (const row of field) {
        const cell = row.filter(cell => cell.player === player);
        if (cell.length > 0) responce = responce.concat(cell);
    }
    return responce;
}
