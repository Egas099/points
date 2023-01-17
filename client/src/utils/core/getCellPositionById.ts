import { FIELD_WIDTH } from "../../data/constants";

export const getCellPositionById = (number: number, fieldWidth: number = FIELD_WIDTH) => [
    Math.floor(number / fieldWidth),
    number % fieldWidth
]