import { Injectable, InjectionToken } from '@angular/core';
import { IFigureData } from '../types';
import { FigureFallingHandler, IFigureFallingHandler } from './figure-falliing.handler';

export const FIGURE_FALLING_BUILDER = new InjectionToken<IFigureFallingHandlerBuilder>('FIGURE_FALLING_BUILDER');

export interface IFigureFallingBuildOptions {
    data: IFigureData,
    border: number[],
    stateIndex: number,
}

export interface IFigureFallingHandlerBuilder {
    build(options: IFigureFallingBuildOptions): IFigureFallingHandler
}

@Injectable()
export class FigureFallingHandlerBuilder implements IFigureFallingHandlerBuilder {
    build({ data, border, stateIndex }: IFigureFallingBuildOptions): IFigureFallingHandler {
        return new FigureFallingHandler(data, border, stateIndex);
    }
}
