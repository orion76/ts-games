/* eslint-disable @angular-eslint/component-class-suffix */
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { AfterViewChecked, ChangeDetectionStrategy, Component, computed, inject, viewChild } from "@angular/core";
import { GAME_STORE } from "../../services/store/game.store";
import { IPlayerConfig, IStepData } from "../../types";
import { TTTCell } from "../cell/cell.component";


@Component({
    selector: 'ttt-play-log',
    standalone: true,
    template: `
        <cdk-virtual-scroll-viewport itemSize="10"  class="steps">
            <div *cdkVirtualFor="let step of  store.steps()" class="step">
                <div class="content">
                    <ttt-cell class="step--char" [char]="getPlayer(step)"></ttt-cell>
                    <div class="step--player step-info">{{step.playerId}}</div>
                    <div class="step--status step-info">{{step.status}}</div>
                </div>
        </div>
        </cdk-virtual-scroll-viewport>
    `,
    styleUrl: 'play-log.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ScrollingModule, TTTCell],
    host: { class: 'ttt-play-log' }
})
export class TTTPlayLog implements AfterViewChecked {
    readonly store = inject(GAME_STORE);
    readonly steps = computed<IStepData[]>(() => this.store.steps())

    readonly viewport = viewChild(CdkVirtualScrollViewport);
    ngAfterViewChecked() {
        this.scrollToBottom();
    }
    scrollToBottom(): void {
        this.viewport()?.scrollToIndex(this.store.steps().length);
    }

    getPlayer({ playerId }: IStepData) {
        return this.store.players().find((p) => p.playerId === playerId)!;
    }
}