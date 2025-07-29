import { InjectionToken } from '@angular/core';
import { IFigureData } from '../../types';
import { configFigureI } from './i';
import { configFigureO } from './o';

export type TObjectKeys<T, K extends keyof T = keyof T> = K extends string ? K : never;

function arrayToMap<T, K extends keyof T>(arr: T[], key: K): Map<string, T> {
    return arr.reduce((map: Map<string, T>, item: T) => {
        if (typeof item[key] === 'string') {
            map.set(item[key], item);
        }

        return map;
    }, new Map());
}

export const TETRIS_FIGURES_DATA = new InjectionToken<Map<string, IFigureData>>('TETRIS_FIGURES_DATA', {
    factory: () => arrayToMap([configFigureI, configFigureO], 'id'),
});
