import { getFormattedDate } from './getFormattedDate';

describe('getFormattedDate', () => {
    test('0 => 03:00:00, 01.01.1970', () => {
        expect(getFormattedDate(0)).toBe('03:00:00, 01.01.1970');
    });
    test('1673634875729 => 21:34:35, 13.01.2023', () => {
        expect(getFormattedDate(1673634875729)).toBe('21:34:35, 13.01.2023');
    });
    test('-62135605817000 => 21:34:35, 13.01.2023', () => {
        expect(getFormattedDate(-62135605817000)).toBe('00:00:00, 01.01.1');
    });
});
