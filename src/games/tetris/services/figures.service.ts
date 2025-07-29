import { inject, InjectionToken } from '@angular/core';
import { getRandomItem } from '@libs/random';
import { TETRIS_FIGURES_DATA } from '../configs/figures';
import { IFigureData } from '../types';

export interface IFiguresService {
    get(): IFigureData
}

export const FIGURES_SERVICE = new InjectionToken<IFiguresService>('FIGURES_SERVICE');

export class FiguresService implements IFiguresService {
    figures = inject(TETRIS_FIGURES_DATA)
    ids = Array.from(this.figures.keys());
    get(): IFigureData {
        const figureId = getRandomItem(this.ids);
        const figure = this.figures.get(figureId);
        if (!figure) {
            throw new Error(`Tetris figure with id: ${figureId} not found.`)
        }
        return figure;
    }
}
