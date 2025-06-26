/* eslint-disable @angular-eslint/component-class-suffix */
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { GAME_STORE } from "../../services/store/game.store";
import { IPlayerConfig, IStepData } from "../../types";
import { TTTCell } from "../cell/cell.component";


@Component({
    selector: 'ttt-play-state',
    standalone: true,
    template: `
    <div class="players">
    @for (player of store.players(); track player.playerId) {
        <mat-card appearance="outlined" [class]="playerClass(player)">
            <mat-card-header>
                <mat-card-title> {{player.name}}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <ttt-cell class="player-char" [char]="player" />
            </mat-card-content>
        </mat-card>
    }
    </div>
    `,
    styleUrl: 'play-state.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TTTCell,
        MatCard, MatCardTitle, MatCardHeader, MatCardContent,
        ScrollingModule],
})
export class TTTPlayState {
    readonly store = inject(GAME_STORE);
    readonly steps = computed<IStepData[]>(() => this.store.steps())




    printIsCurrent(player: IPlayerConfig) {
        return this.store.activePlayer().playerId === player.playerId ? 'player-current' : '';
    }

    playerClass(player: IPlayerConfig) {
        return `player ${player.playerId} ${this.printIsCurrent(player)}`;
    }
}