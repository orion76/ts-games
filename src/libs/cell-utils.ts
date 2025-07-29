
import { TFieldState, UChar } from "../games/tic-tac-toe/types";
import { TCellCoord } from "./common";

export function setCellValue(field: TFieldState, coord: TCellCoord, char: UChar) {
    const [x, y] = coord;
    field[y][x] = char;
    return field;
}

export function getCellValue(field: TFieldState, coord: TCellCoord): UChar {
    const [x, y] = coord;
    return field[y][x];
}

export function equalCells(a: TCellCoord, b: TCellCoord): boolean {
    return a[0] === b[0] && a[1] === b[1];
}

export function hasCell(collection: TCellCoord[], cell: TCellCoord): boolean {
    return collection.some((_cell) => equalCells(_cell, cell));
}
