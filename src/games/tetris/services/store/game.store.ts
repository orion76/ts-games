import { computed, effect, inject, InjectionToken, signal, Signal, untracked } from '@angular/core';

import { TCellCoord } from '@libs/common';
import { patchState, signalStore, watchState, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { clog } from '../../../../app/modules/block-pages/utils';
import { GAME_CONFIG } from '../../main.component';
import { IGameState, TField, TGameStatus } from '../../types';
import { printField } from '../../utils/common';
import { TGameStore } from './types';

export const GAME_STORE = new InjectionToken<TGameStore>('GAME_STORE');

export const gameState: IGameState = {
    status: 'stop',
    fieldRecumbent: [],
    cellsFalling: undefined
};

export const GameStore = signalStore(
    withProps((store) => ({
        config: inject(GAME_CONFIG),
    })),
    withState<IGameState>(gameState),
    withComputed(({ cellsFalling, fieldRecumbent, status, config }) => ({
        field: computed(() => {
            const field = structuredClone(fieldRecumbent());
            const cells = cellsFalling();

            if (cells && field.length > 0) {
                cells.forEach(([x, y]) => field[y][x] = true);
            }

            return field;
        }),
        onGameStart: computed(() => status() === 'start'),
        onGamePause: computed(() => status() === 'pause'),
        onGameResume: computed(() => status() === 'resume'),
        onGameStop: computed(() => status() === 'stop'),
        onGameFinish: computed(() => status() === 'finish'),
    })),
    withHooks(({
        onInit(store) {
            watchState(store, ({ config, field }: any) => {
                if (config && field) {
                    const { fieldWidth, fieldHeight } = config;
                    clog('!!!STORE FIELD', { color: '333399' }, printField(fieldWidth, fieldHeight, field));
                }
            });
        },
    })),
    withMethods(store => ({
        gameStart() {
            const status: TGameStatus = 'start';
            patchState(store, () => ({ status }));
        },
        gameStop() {
            const status: TGameStatus = 'stop';
            patchState(store, () => ({ status }));
        },
        gamePause() {
            const status: TGameStatus = 'pause';
            patchState(store, () => ({ status }));
        },
        gameResume() {
            const status: TGameStatus = 'resume';
            patchState(store, () => ({ status }));
        },
        gameFinish() {
            const status: TGameStatus = 'finish';
            patchState(store, () => ({ status }));
        },
        setFieldRecumbent(fieldRecumbent: TField) {
            patchState(store, () => ({ fieldRecumbent }));
        },
        setCellsFalling(cellsFalling: TCellCoord[], value: boolean) {
            patchState(store, () => ({ cellsFalling }));
        },
    })),
);
