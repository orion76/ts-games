import { TCellCoord } from "@libs/common";
import { LINES_COORDS } from "../../../constants";
import { getEmptyCells } from "../../../services/utils";
import { TFieldState, UChar } from "../../../types";
import { findLinesByCharCount } from "../../../utils/field-result";
import { TLineCoord } from "../../../utils/generate-coordinates";
import { hasCell } from "@libs/cell-utils";


export function getLinesWithCellFilledCount(field: TFieldState, char: UChar, cellFilledCount: number): TLineCoord[] {
    return findLinesByCharCount(field, char, cellFilledCount).map((index) => LINES_COORDS[index]);
}

export function _getEmptyCells(field: TFieldState, filled: TLineCoord[]): TCellCoord[] {
    const emptyCells = getEmptyCells(field);
    return emptyCells.filter((cell) => filled.every((line) => !hasCell(line, cell)));
}

export type TCompareFunction = <T>(a: T, b: T) => boolean;

const simpleCompare: TCompareFunction = (a, b) => a === b

function __arrayIntersection<T>(a: T[], b: T[], isEqual: TCompareFunction = simpleCompare): T[] {

    return a.filter((ai) => {
        const res = b.some((bi) => {
            const res = isEqual(ai, bi);

            return res;
        });

        return res;
    })
}

export function arraysIntersection<T>(a: T[], b: T[], isEqual: TCompareFunction = simpleCompare): T[] {
    return a.filter((ai) => b.some((bi) => isEqual(ai, bi)))
}

export function arraysDifferenceLeft<T>(a: T[], b: T[], isEqual: TCompareFunction = simpleCompare): T[] {
    return a.filter((ai) => b.every((bi) => !isEqual(ai, bi)))
}


export function arraysDifference<T>(a: T[], b: T[], isEqual: TCompareFunction = simpleCompare): T[] {
    const diff1 = arraysDifferenceLeft(a, b, isEqual);
    const diff2 = arraysDifferenceLeft(b, a, isEqual);
    return diff1.concat(diff2);
}