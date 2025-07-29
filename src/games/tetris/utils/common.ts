
import { TCellCoord } from '@libs/common';
import { TField } from '../types';

export function generateEmptyField<T>(width: number, height: number, value: T): TField<T> {
    const field: TField<T> = [];
    for (let ri = 0; ri < height; ri++) {
        const row = [];
        for (let ci = 0; ci < width; ci++) {
            row.push(value);
        }
        field.push(row);
    }
    return field;
}

export function summCoords(a: TCellCoord, b: TCellCoord): TCellCoord {
    return [a[0] + b[0], a[1] + b[1]];
}

export function shiftCells(x: number, y: number) {
    return (cell: TCellCoord) => summCoords([x, y], cell);
}


export function printField(width: number, height: number, field: TField<boolean>) {
    const formatted = generateEmptyField<string>(width, height, '   ');
    for (let ri = 0; ri < field.length; ri++) {
        const row = field[ri];
        for (let ci = 0; ci < row.length; ci++) {

            formatted[ri][ci] = field[ri][ci] ? '0' : ' ';
        }
    }
    return formatted;
}