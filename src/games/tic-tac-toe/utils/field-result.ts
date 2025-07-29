import { getCellValue } from "@libs/cell-utils";
import { TCellCoord } from "@libs/common";
import { LINES_COORDS } from "../constants";
import { TFieldState, UChar } from "../types";
import { TLineCoord } from "./generate-coordinates";


export function calculateLine(field: TFieldState, lineCoord: TLineCoord, char: UChar) {
    return lineCoord
        .map((coord) => getCellValue(field, coord))
        .map((c) => c === char ? 1 : 0)
        .reduce((sum: number, num: number) => sum + num, 0);
}

export function calculeteLines(field: TFieldState, char: UChar): number[] {
    return LINES_COORDS.map((lineCoords) => calculateLine(field, lineCoords, char));
}

export function findCoordinate(field: TFieldState, line: TLineCoord, char: UChar): TCellCoord | undefined {
    return line.find((coord) => getCellValue(field, coord) === char);
}

export function findLinesByCharCount(field: TFieldState, char: UChar, charCount: number) {
    const lines = calculeteLines(field, char);
    return lines
        .map((count, index) => ({ count, index }))
        .filter(({ count }) => count === charCount)
        .map(({ index }) => index);
}