import { Player } from '../../data/enums';
import { RootState } from '../../store';
import { randomElementFrom } from './aiHelpers';
import normalBots from './normal';
import simpleBots from './simple';

type Difficulty = 'simple' | 'normal';
export interface BotProfile {
    name: string;
    implementation: (state: RootState, ownCells: Cell[]) => Cell | void;
    description: string;
    difficulty: Difficulty;
}

const AI = {
    getRandomBot: function (difficulty: Difficulty): string {
        return randomElementFrom(
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
        const ownCells = findCellsByPlayer(state.field, state.gameState.mover);

        let botMove;
        if (botImplementation) {
            botMove = botImplementation(state, ownCells);
        } else {
            console.error(
                'The requested bot implementation was not found. Random implementation will be chosen.'
            );
            botMove = randomElementFrom(AI_PROFILES).implementation(
                state,
                ownCells
            );
        }
        if (botMove) {
            return botMove;
        }
        return randomElementFrom(ownCells);
    }
};
export default AI;

const AI_PROFILES: BotProfile[] = [simpleBots, normalBots].flat();

function findCellsByPlayer(field: Cell[][], player: Player) {
    let response: Cell[] = [];
    for (const row of field) {
        const cell = row.filter(cell => cell.player === player);
        if (cell.length > 0) response = response.concat(cell);
    }
    return response;
}
