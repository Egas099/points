import { random } from "../common";
import normalBots from "./normal";
import simpleBots from "./simple";

type Difficulty = 'simple' | 'normal'
export interface BotProfile {
    name: string,
    implementation: Function,
    description: string,
    difficulty: Difficulty
}

const AI = {
    getRandonBot: function (difficulty: Difficulty): string {
        return random.elemetFrom(
            AI_PROFILES.filter(bot => bot.difficulty === difficulty)
        ).name;
    },
    getBotById: function (id: string): BotProfile | undefined {
        return AI_PROFILES.find(bot => bot.name === id)
    },
    getBotImplementationById: function (id: string): Function {
        return  AI_PROFILES.find(bot => bot.name === id)?.implementation || emptyFunc
    }
}
export default AI;

const AI_PROFILES: BotProfile[] = [simpleBots, normalBots].flat()
const emptyFunc = () => {}
