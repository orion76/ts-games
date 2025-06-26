/* eslint-disable @angular-eslint/component-class-suffix */
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MODAL_WINDOW_SERVICE } from "../../../../app/modules/modal-window/modal-window.service";
import { TTTBotControl } from "../../modules/player-bot/components/bot-control/bot-control.component";
import { GAME_STORE } from "../../services/store/game.store";
@Component({
    selector: 'ttt-play-control',
    standalone: true,
    template: `
<mat-toolbar>

    <button type="button"  mat-flat-button (click)="startNewGame()">New game</button>
  <button type="button" mat-mini-fab aria-label="Game settings"><mat-icon fontIcon="home"/></button>

<ttt-bot-control/>
</mat-toolbar>
    `,
    styleUrl: 'play-control.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatToolbar, MatButtonModule, MatIconModule, TTTBotControl],
})
export class TTTPlayControl {
    store = inject(GAME_STORE)
    modalWindow = inject(MODAL_WINDOW_SERVICE);
    startNewGame() {
        this.store.startNewGame();
    }
}