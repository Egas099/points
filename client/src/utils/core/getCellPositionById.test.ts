import { getCellPositionById } from './getCellPositionById';

describe('getCellPositionById', () => {
    test('0, 10 => [0, 0]', () => {
        expect(getCellPositionById(0, 10)).toEqual([0, 0]);
    });
    test('12 => [1, 2]', () => {
        expect(getCellPositionById(12, 10)).toEqual([1, 2]);
    });
    test('10 => [1, 0]', () => {
        expect(getCellPositionById(10, 10)).toEqual([1, 0]);
    });

    test('46 => [1, 22]', () => {
        expect(getCellPositionById(46, 24)).toEqual([1, 22]);
    });

    test('532 => [4, 48]', () => {
        expect(getCellPositionById(532, 121)).toEqual([4, 48]);
    });
});
