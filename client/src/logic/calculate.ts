import { FIELD_WIDTH } from '../data/constants'

export const cellPositionById = (number: number) => [
    Math.floor(number / FIELD_WIDTH),
    number % FIELD_WIDTH
]
