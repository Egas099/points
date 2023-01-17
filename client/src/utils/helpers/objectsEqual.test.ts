import { objectsEqual } from './objectsEqual';

const objA = {
    prop: {
        prop: {
            prop: 42,
            prop1: 24
        }
    }
};

const objB = {
    prop: {
        prop: {
            prop: 42,
            prop1: 24
        }
    }
};

const objC = {
    prop: {
        prop: {
            prop: 43,
            prop1: 24
        }
    }
};

describe('objectsEqual', () => {
    test('objects is equal', () => {
        expect(objectsEqual(objA, objB)).toBe(true);
    });
    test('objects is not equal', () => {
        expect(objectsEqual(objB, objC)).toBe(false);
    });
});
