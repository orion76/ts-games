import { getMaxIndex } from '@libs/array';
import { IFigureData } from '../types';
import { shiftCells } from '../utils/common';
import { TCellCoord } from '@libs/common';

export interface IFigureFallingHandler {
    isFell(): boolean;
    moveDown(): TCellCoord[] | undefined;
    moveLeft(): TCellCoord[] | undefined;
    moveRight(): TCellCoord[] | undefined;
    rotateLeft(): TCellCoord[];
    rotateRight(): TCellCoord[];
    getCells(): TCellCoord[];
    getWidth(): number;
    setStartColumn(index: number): void;
}


export class FigureFallingHandler implements IFigureFallingHandler {
    private variantIndex!: number;
    x = 0;
    y = 0;
    constructor(
        private data: IFigureData,
        private border: number[],
        stateIndex: number,
    ) {
        this.variantIndex = this.getVariantIndex(stateIndex);
    }
    getMaxX() {
        return getMaxIndex(this.border);
    }

    rotateLeft(): TCellCoord[] {
        if (this.variantIndex === 0) {
            this.variantIndex = getMaxIndex(this.data.variants)
        } else {
            this.variantIndex--;
        }
        return this.getCells();
    }
    rotateRight(): TCellCoord[] {
        if (this.variantIndex === getMaxIndex(this.data.variants)) {
            this.variantIndex = 0;
        } else {
            this.variantIndex++;
        }
        return this.getCells();
    }

    isFell(): boolean {

        const figureBottom = this._getFigureBottom();
        return figureBottom.some((cell, i) => {
            const x = this.x + i;
            const y = this.y + cell[1];

            return this.border[x] === y;
        })
    }
    moveDown(): TCellCoord[] | undefined {
        if (this.isFell()) {
            return;
        }
        this.y++;
        return this.getCells();
    }
    moveLeft(): TCellCoord[] | undefined {
        if (this.x === 0) {
            return;
        }
        this.x--;
        return this.getCells();
    }

    moveRight(): TCellCoord[] | undefined {
        if (this.x === this.getMaxX()) {
            return;
        }
        this.x++;
        return this.getCells();
    }
    rotate(stateIndex: number) {
        this.variantIndex = this.getVariantIndex(stateIndex);
    }
    private _getFigureBottom() {
        const { cells } = this._getFigure();
        const bottom = [];
        let index = 0;
        let column: TCellCoord[] = this._getColumn(cells, index);

        while (column.length > 0) {
            bottom.push(this._findMaxY(column));
            index++;
            column = this._getColumn(cells, index);
        }

        return bottom;
    }

    getWidth(): number {
        const cells = this.getCells()
        const max = cells.reduce((max, item) => max[0] > item[0] ? max : item);
        return max[0];
    }


    private _findMaxY(cells: TCellCoord[]) {
        const max = cells.reduce((max, item) => max[1] > item[1] ? max : item);
        return max;
    }
    private _getColumn(cells: TCellCoord[], index: number) {
        return cells.filter(cell => cell[0] === index);
    }
    private _getFigure() {
        return this.data.variants[this.variantIndex];
    }

    getCells(): TCellCoord[] {
        const { x, y } = this;
        return this._getFigure().cells.map(shiftCells(x, y));
    }

    getVariantIndex(stateIndex: number) {
        return this.data.indexMap[stateIndex];
    }

    setStartColumn(index: number) {
        this.x = index;
    }
}
