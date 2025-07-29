import { ChangeDetectionStrategy, Component, inject, InjectionToken, ViewEncapsulation } from '@angular/core';
import { providePluginManager } from '@orion76/ng-plugin';
import { gameConfig } from './config';

import { GAME_SERVICE, GameService } from './services/game-management/game.service';

import { TetrisPlayingField } from './components/playing-field/playing-field.component';
import { GAME_STORE, GameStore } from './services/store/game.store';
import { IGameConfig } from './types';
import { FIGURE_FALLING_BUILDER, FigureFallingHandlerBuilder } from './services/figure-falling-handler.builder';
import { PLAY_CONTROL_SERVICE, PlayControlService } from './services/play-control.service';
import { TetrisPlayControl } from './components/play-control/play-control.component';
import { TICK_SERVICE, TickService } from './services/tick/tick.service';
import { FIGURES_SERVICE, FiguresService } from './services/figures.service';
import { tetrisFieldProvider } from './services/store/providers';
import { FIGURE_RECUMBENT_SERVICE, FiguresRecumbentService } from './services/figure-recumbent-handler.service';
import { TetrisPlayControlMain } from './components/play-control-main/play-control-main.component';

export const GAME_CONFIG = new InjectionToken<IGameConfig>('GAME_CONFIG');

@Component({
    selector: 'game--tetris--main',
    template: `
    <div class="playing-field-wrapper">
        <tetris-play-control-main class="tetris-play-control-main"/>
        <tetris-playing-field class="tetris-playing-field"/>
        <tetris-play-control class="tetris-play-control"/>
    </div>
    `,
    styleUrl: 'main.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TetrisPlayingField, TetrisPlayControlMain, TetrisPlayControl],
    providers: [
        { provide: GAME_SERVICE, useClass: GameService },
        { provide: GAME_CONFIG, useValue: gameConfig },
        { provide: GAME_STORE, useClass: GameStore },
        { provide: FIGURE_FALLING_BUILDER, useClass: FigureFallingHandlerBuilder },
        { provide: PLAY_CONTROL_SERVICE, useClass: PlayControlService },
        { provide: TICK_SERVICE, useClass: TickService },
        { provide: FIGURES_SERVICE, useClass: FiguresService },
        { provide: FIGURE_RECUMBENT_SERVICE, useClass: FiguresRecumbentService },
        tetrisFieldProvider()
    ],
    encapsulation: ViewEncapsulation.None,
    host: { class: 'game--tetris--main' },
    standalone: true,
})
export class TetrisMainComponent {
    service = inject(GAME_SERVICE);
}
