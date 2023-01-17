export function objectsEqual(objA: object, objB: object): boolean {
    return JSON.stringify(objA) === JSON.stringify(objB);
}
