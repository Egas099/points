import { webStorage } from './webStorage';

const mockObject = {
    prop1: {
        prop2: 42
    }
};

describe('webStorage', () => {
    test('getting default value', () => {
        expect(webStorage.getItem('nonExistentValue', 'testValue')).toBe(
            'testValue'
        );
    });
    test('setting and getting string value', () => {
        webStorage.setItem('testValue', 'testValue');
        expect(webStorage.getItem('testValue', undefined)).toBe('testValue');
    });
    test('clearing string value', () => {
        webStorage.remoteItem('testValue');
        expect(webStorage.getItem('testValue', undefined)).toBeUndefined();
    });

    test('setting and getting object', () => {
        webStorage.setItem('testValue', mockObject);
        expect(webStorage.getItem('testValue', undefined)).toEqual(mockObject);
    });
});
