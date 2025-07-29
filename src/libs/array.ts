export function getMaxIndex<T>(arr: T[]): number {
    return arr.length - 1;
}

export function getLastItem<T>(arr: T[]): T {
    return arr[getMaxIndex(arr)];
}