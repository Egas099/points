export function trying<F, C>(
    func: () => F,
    onCatch: undefined | (() => C) = undefined
) {
    try {
        return func();
    } catch (error) {
        if (typeof onCatch === 'function') {
            return onCatch();
        } else {
            return undefined;
        }
    }
}
