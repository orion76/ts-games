import { effect, inject, Injectable, InjectionToken } from '@angular/core';

import { TETRIS_FIGURES_DATA } from '../../configs/figures';
import { IGameService, TGameStatus } from '../../types';
import { generateEmptyField } from '../../utils/common';

import { GAME_CONFIG } from '../../main.component';
import { IFigureFallingHandler } from '../figure-falliing.handler';
import { FIGURE_FALLING_BUILDER } from '../figure-falling-handler.builder';

import { getRandomNumber } from '@libs/random';
import { clog, tlog } from '../../../../app/modules/block-pages/utils';
import { FIGURE_RECUMBENT_SERVICE, IFiguresRecumbentService } from '../figure-recumbent-handler.service';
import { FIGURES_SERVICE } from '../figures.service';
import { PLAY_CONTROL_SERVICE } from '../play-control.service';
import { GAME_STORE } from '../store/game.store';
import { TICK_SERVICE } from '../tick/tick.service';

export const GAME_SERVICE = new InjectionToken<IGameService>('GAME_SERVICE');
let counter = 0;
@Injectable()
export class GameService implements IGameService {

    store = inject(GAME_STORE);
    config = inject(GAME_CONFIG);
    figures = inject(TETRIS_FIGURES_DATA);
    control = inject(PLAY_CONTROL_SERVICE);
    tickService = inject(TICK_SERVICE);


    figureFallingBuilder = inject(FIGURE_FALLING_BUILDER)
    figuresService = inject(FIGURES_SERVICE)

    figureFalling!: null | IFigureFallingHandler;
    private recumbentService = inject(FIGURE_RECUMBENT_SERVICE);

    constructor() {

        this.init();
    }

    init(): void {
        this.gameInit();
        tlog('tick', 'init');
        effect(() => {
            if (this.tickService.tick()) {

                this.handleTick();
            }
        })


        effect(() => {
            this.handleStatusChange(this.store.status());
        })
    }

    handleStatusChange(status: TGameStatus) {
        clog('++ [status]', {}, status);
        switch (status) {
            case 'start':
                this.gameStart()
                break;
            case 'pause':
                this.tickService.stop();
                break;
            case 'resume':
                this.tickService.resume();
                break;
            case 'finish':
                break;

            case 'stop':
                this.tickService.stop();
                break
        }
    }

    gameInit() {
        const { fieldWidth: fieldWIdth, fieldHeight } = this.config;
        const field = generateEmptyField(fieldWIdth, fieldHeight, false);

        this.store.setFieldRecumbent(field);
    }

    gameStart() {
        this.tickService.start(1);
    }

    handleTick() {
        counter++;

        if (!this.figureFalling) {
            this.figureFalling = this.createFigure();
            const startCells = this.figureFalling.getCells();
            this.store.setCellsFalling(startCells, true);
            tlog('tick', 'start');
        } else {
            const newCells = this.figureFalling.moveDown();

            if (newCells) {
                this.store.setCellsFalling(newCells, true);

            }
            tlog('tick', 'move');
        }
    }


    createFigure() {
        const figure = this.figureFallingBuilder.build({
            data: this.figuresService.get(),
            border: this.recumbentService.getBorder(),
            stateIndex: getRandomNumber(0, 3),
        });
        const figureWidth = figure.getWidth()
        const startColumn = getRandomNumber(0, this.config.fieldWidth - (figureWidth + 1));
        figure.setStartColumn(startColumn);

        return figure;
    }



    // startFigure(figureId: string): TCellCoord[] {
    //     const startColumn = getRandomNumber(0, this.WIDTH - 1);
    //     const variantIndex = 1;
    //     const cells: TCellCoord[] = plugin.cells(variantIndex);
    //     console.log('444444444444444', cells);
    //     return cells.map(shiftCells(startColumn, 0));
    // }
}
