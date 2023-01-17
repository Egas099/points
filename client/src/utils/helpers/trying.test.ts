import { trying } from './trying';

describe('trying', () => {
    test('successful function call attempt', () => {
        expect(
            trying(
                () => 'success',
                () => undefined
            )
        ).toBe('success');
    });
    test('failed function call attempt', () => {
        expect(
            trying(
                () => {
                    throw new Error('');
                },
                () => 'fail'
            )
        ).toBe('fail');
    });
    test('failed function call attempt without onCatch handler', () => {
        expect(
            trying(() => {
                throw new Error('');
            })
        ).toBeUndefined();
    });
});
