export function getFormattedDate(time: number) {
    return new Date(time).toLocaleString().split(', ').reverse().join(', ');
}
