import { TCellCoord } from '@libs/common';
import { IPlugin } from '@orion76/plugin';


export type TIndexMap = [number, number, number, number];

export const ROTATE_RIGHT = 1;
export const ROTATE_LEFT = -1;
export type TRotateDirection = typeof ROTATE_RIGHT | typeof ROTATE_LEFT;

export interface IFigure {
    cells: TCellCoord[];
}


export type TFigureVariants = IFigure[];

export interface IFigureData {
    id: string;
    variants: TFigureVariants;
    indexMap: TIndexMap;
}

export interface IFigureState extends IFigure {
    type: string;
    variantIndex: number;
    x: number;
    y: number;
}
export interface IFigureHandler extends IPlugin {
    figure(variantIndex: number): IFigure;
    cells(index: number): TCellCoord[];
}
