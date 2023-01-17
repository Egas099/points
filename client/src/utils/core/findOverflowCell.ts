interface CellWithCount {
    count: number;
}

export function findOverflowCell<T extends CellWithCount>(field: T[][]) {
    for (const row of field) {
        const cell = row.find(cell => cell.count > 3);
        if (cell) return cell;
    }
}