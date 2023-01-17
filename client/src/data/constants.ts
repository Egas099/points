import { PlayerEntity } from "./enums";

export const SERVER_URL = 'http://localhost:5000';
export const ABOUT_URL =
    'https://raw.githubusercontent.com/Egas099/points/main/client/ABOUT.md';
export const APP_VERSION = '1.0';
export const FIELD_WIDTH = 9;
export const FIELD_HEIGHT = 9;
export const BOT_MOVING_DELAY = 0;
export const CELL_CLONING_DELAY = 0;
export const COLOR_INTENSITIES = [
    '',
    'low',
    'medium',
    'high',
    'overflow',
    'overflow'
];
export const POPUP_TIMEOUT = 300;

export const ENTITY_ICONS = {
    [PlayerEntity.empty]: '?',
    [PlayerEntity.localPlayer]: '🙂',
    [PlayerEntity.android]: '🤖'
}