export function getRandomNumber(from: number, to: number) {
    return from + Math.round(Math.random() * to);
}

export function getRandomIndex(arr: unknown[]): number {
    return arr.length > 0 ? getRandomNumber(0, arr.length - 1) : -1;
}

export function getRandomItem<T>(arr: T[]): T {
    const index = getRandomIndex(arr);
    return arr[index];
}
