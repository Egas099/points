import { findOverflowCell } from './findOverflowCell';

describe('findOverflowCell', () => {
    test('No overflow cell', () => {
        expect(
            findOverflowCell([
                [
                    {
                        count: 0
                    }
                ],
                [
                    {
                        count: 1
                    }
                ],
                [
                    {
                        count: 2
                    },
                    {
                        count: 3
                    }
                ]
            ])
        ).toBeUndefined();
    });

    test('Overflow cell exist', () => {
        expect(
            findOverflowCell([
                [
                    {
                        id: 1,
                        count: 0
                    }
                ],
                [
                    {
                        id: 2,
                        count: 0
                    },
                    {
                        id: 3,
                        count: 4
                    }
                ],
                [
                    {
                        id: 4,
                        count: 2
                    }
                ]
            ])
        ).toEqual({ id: 3, count: 4 });
    });
});
