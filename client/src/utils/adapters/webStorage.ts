export const webStorage = {
    setItem: (itemName: string, itemValue: unknown): void => {
        localStorage.setItem(itemName, JSON.stringify(itemValue));
    },
    getItem: <T>(itemName: string, defaultItem: T): T => {
        const item = localStorage.getItem(itemName);

        return item ? JSON.parse(item) : defaultItem;
    },
    remoteItem: (itemName: string) => {
        localStorage.removeItem(itemName);
    }
};
