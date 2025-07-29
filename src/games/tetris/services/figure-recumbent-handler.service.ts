import { inject, Injectable, InjectionToken } from '@angular/core';
import { TField } from '../types';
import { generateEmptyField } from '../utils/common';
import { TETRIS_FIELD_STATE } from './store/providers';
import { GAME_CONFIG } from '../main.component';

export interface IFiguresRecumbentService {
    getBorder(): number[];
}

export const FIGURE_RECUMBENT_SERVICE = new InjectionToken<IFiguresRecumbentService>('FIGURE_RECUMBENT_SERVICE');

@Injectable()
export class FiguresRecumbentService implements IFiguresRecumbentService {
    config = inject(GAME_CONFIG);
    field = inject(TETRIS_FIELD_STATE);

    getBorder(): number[] {
        const { fieldWidth: fieldWIdth, fieldHeight } = this.config;
        const border: number[] = new Array(fieldWIdth).fill(fieldHeight - 1);

        this.field().forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell) {
                    border[cellIndex] = rowIndex;
                }
            })
        })

        return border;
    }
}
