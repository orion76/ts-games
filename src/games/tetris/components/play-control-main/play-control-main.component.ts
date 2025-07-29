import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PLAY_CONTROL_SERVICE } from '../../services/play-control.service';
import { UEvents, TEventIntervals } from '../../types/common';
import { GAME_STORE } from '../../services/store/game.store';

interface IControlButtonData {
    event: UEvents;
    icon: string;
    elementClass: string;
}

@Component({
    selector: 'tetris-play-control-main',
    standalone: true,
    template: `
    <div class="control-buttons">
        <button mat-flat-button class="play-control-button" (click)="store.gameStart()">Start</button>
        @if(store.onGamePause()){
            <button mat-flat-button class="play-control-button" (click)="store.gameResume()">Resume</button>
        }@else{
            <button mat-flat-button class="play-control-button" (click)="store.gamePause()">Pause</button>
        }
        <button mat-flat-button class="play-control-button" (click)="store.gameStop()">Stop</button>
    </div>
    `,
    styleUrl: 'play-control-main.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, MatIconModule],
})
export class TetrisPlayControlMain {
    store = inject(GAME_STORE);
}
