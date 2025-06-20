/* eslint-disable @angular-eslint/component-class-suffix */
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { GAME_STORE } from "../../services/store/game.store";
@Component({
    selector: 'ttt-play-control',
    standalone: true,
    template: `
<mat-toolbar>
    <button mat-stroked-button color='primary'>Basic</button>
    <button mat-flat-button (click)="startNewGame()">New game</button>

</mat-toolbar>
    `,
    styleUrl: 'play-control.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatToolbar, MatButton],
})
export class TTTPlayControl {
    store = inject(GAME_STORE)

    startNewGame() {
        this.store.startNewGame();
    }
}