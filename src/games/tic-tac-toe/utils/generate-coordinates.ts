import { TCellCoord } from "../types";

export type TLineCoord = [TCellCoord, TCellCoord, TCellCoord];


function toRow(x: number, y: number): TCellCoord {
    return [x, y];
}

function toColumn(x: number, y: number): TCellCoord {
    return [y, x];
}

function generateLine(x: number, func: (x: number, y: number) => TCellCoord) {
    return [0, 1, 2].map((y) => func(x, y)) as TLineCoord
}

function increment(n: number) {
    return n;
}

function decrement(n: number) {
    return 2 - n;
}

function generateDiagonal(start: number) {
    const func = start === 0 ? increment : decrement;
    return [0, 1, 2].map((y) => [y, func(y)]) as TLineCoord
}

export function generateLinesCoord(): TLineCoord[] {
    const lines: TLineCoord[] = [];
    [0, 1, 2].forEach((x) => lines.push(generateLine(x, toColumn)));
    [0, 1, 2].forEach((x) => lines.push(generateLine(x, toRow)));
    lines.push(generateDiagonal(0));
    lines.push(generateDiagonal(2));

    return lines
}
