import { isExistCellAtPosition } from './isExistCellAtPosition';

const field = [
    [{ exist: true }, { exist: false }, { exist: false }],
    [{ exist: true }, { exist: true }, { exist: true }],
    [{ exist: false }, { exist: false }, { exist: true }]
];

describe('isExistCellAtPosition', () => {
    test('Cell exist', () => {
        expect(isExistCellAtPosition(field, [0, 0])).toBe(true);
        expect(isExistCellAtPosition(field, [1, 0])).toBe(true);
        expect(isExistCellAtPosition(field, [1, 1])).toBe(true);
        expect(isExistCellAtPosition(field, [1, 2])).toBe(true);
        expect(isExistCellAtPosition(field, [2, 2])).toBe(true);
    });
    test('Cell exist', () => {
        expect(isExistCellAtPosition(field, [0, 1])).toBe(false);
        expect(isExistCellAtPosition(field, [0, 2])).toBe(false);
        expect(isExistCellAtPosition(field, [2, 0])).toBe(false);
        expect(isExistCellAtPosition(field, [2, 1])).toBe(false);
    });
    test('Index out of range', () => {
        expect(isExistCellAtPosition(field, [-1, 1])).toBe(false);
        expect(isExistCellAtPosition(field, [1, -1])).toBe(false);
        expect(isExistCellAtPosition(field, [3, 1])).toBe(false);
        expect(isExistCellAtPosition(field, [1, 3])).toBe(false);
    });
});
