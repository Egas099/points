export const localStorageWrapper = {
    setItem: (itemName: string, itemValue: any): void => {
        localStorage.setItem(itemName, JSON.stringify(itemValue));
    },

    getItem: (itemName: string, defaultItem: any = {}): any => {
        const item = localStorage.getItem(itemName);

        return item ? JSON.parse(item) : defaultItem;
    }
};
