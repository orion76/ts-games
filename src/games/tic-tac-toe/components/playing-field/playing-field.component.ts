/* eslint-disable @angular-eslint/component-class-suffix */
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from "@angular/core";
import { PLAYER_HUMAN_TYPE, TTT_PLAYER_PLUGIN_MANAGER } from "../../plugins/player";
import { GAME_STORE } from "../../services/store/game.store";
import { TTTCell } from "../cell/cell.component";
import { TTTWinningLine } from "../winning-line/winning-line.component";
import { EGameStopReason } from "../../services/game-management/types";
import { ICharShow, UChar } from "../../types";

@Component({
    selector: 'ttt-playing-field',
    standalone: true,
    template: `
        @for (row of store.field(); track $index; let y=$index) {
            <div class="row">
            @for (char of row; track $index; let x=$index) {
                <ttt-cell class="cell" [char]="getCharShow(char)" (click)="onCellClick(x,y)" colorCross="#ff9d00" colorZero="#0099ff"></ttt-cell>
            }
            </div>
        }@empty {
        
        }
        <div class="playing-field-cover" [class.playing-field-cover-active]></div>
        @let gameWin = isGameWin();
        @if(gameWin){
            <ttt-winning-line class="winning-line" [lineIndex]="gameWin.lineIndex"></ttt-winning-line>
        }
  
    `,
    styleUrl: 'playing-field.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TTTCell, TTTWinningLine],
    host: { class: 'ttt-playing-field' }
})
export class TTTPlayingField {

    readonly pluginManager = inject(TTT_PLAYER_PLUGIN_MANAGER);
    readonly store = inject(GAME_STORE);
    readonly player = computed(() => {
        const config = this.store.players().find((p) => p.type === PLAYER_HUMAN_TYPE);
        if (!config) {
            throw new Error(`[TTT] Human player is missing`);
        }
        return this.pluginManager.getInstance(config.playerId);
    })

    readonly isGameWin = computed(() => {
        const reason = this.store.gameOver();
         if (!reason || reason.reason !== EGameStopReason.WIN) {
            return
        }
        return { playerId: reason.playerId, lineIndex: reason.lines[0] };
    })

    getCharShow(char: UChar): ICharShow {
        const charColor = this.store.players().find((conf) => conf.char === char)?.charColor!;
        return { char, charColor }
    }

    onCellClick(x: number, y: number) {
        const { playerId, stepAvailable } = this.player();
        if (stepAvailable()) {
            this.store.doStep({ cell: [x, y], playerId, status: 'awaiting' })
        }
    }
}