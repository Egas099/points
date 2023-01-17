import { fieldTemplates } from "../../../data/fieldTemplates";
import { fieldByTemplate } from "./fieldByTemplate";

export const assembleField = (gameForm: GameForm): Cell[][] => {
    const template = fieldTemplates[gameForm.templateId];
    const existPlayers = gameForm.playersProfiles.map(player => player.player);
    return fieldByTemplate(template, existPlayers);
};