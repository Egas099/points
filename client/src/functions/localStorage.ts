type T = any;
export const localStorageWrapper = {
    setItem: (itemName: string, itemValue: T): void => {
        localStorage.setItem(itemName, JSON.stringify(itemValue));
    },

    getItem: (itemName: string, defaultItem: T = {}): T => {
        const item = localStorage.getItem(itemName);

        return item ? JSON.parse(item) : defaultItem;
    }
};
