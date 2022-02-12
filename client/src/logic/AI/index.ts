import { RootState } from '../../store';
import { random } from '../common';
import normalBots from './normal';
import simpleBots from './simple';

type Difficulty = 'simple' | 'normal';
export interface BotProfile {
    name: string;
    implementation: (state: RootState) => Cell;
    description: string;
    difficulty: Difficulty;
}

const AI = {
    getRandonBot: function (difficulty: Difficulty): string {
        return random.elemetFrom(
            AI_PROFILES.filter(bot => bot.difficulty === difficulty)
        ).name;
    },
    getBotById: function (id: string): BotProfile | undefined {
        return AI_PROFILES.find(bot => bot.name === id);
    },
    getBotImplementationById: function (
        id: string
    ): (state: RootState) => Cell {
        const botImplementation = AI_PROFILES.find(
            bot => bot.name === id
        )?.implementation;

        return botImplementation
            ? botImplementation
            : random.elemetFrom(AI_PROFILES).implementation;
    }
};
export default AI;

const AI_PROFILES: BotProfile[] = [simpleBots, normalBots].flat();
