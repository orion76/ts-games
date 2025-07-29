/* eslint-disable @angular-eslint/component-class-suffix */
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { clog } from '../../../../app/modules/block-pages/utils';
import { GAME_CONFIG } from '../../main.component';
import { printField } from '../../utils/common';
import { TETRIS_FIELD_STATE } from '../../services/store/providers';



@Component({
    selector: 'tetris-playing-field',
    standalone: true,
    template: `
    @for (cells of snField(); track $index; let ri = $index) {
        <div class="row">
            @for (filled of cells; track $index; let ci = $index) {
                <div class="cell" [class.filled]="filled"></div>
            }
        </div>
    }
  `,
    styleUrl: 'playing-field.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    host: { class: 'tetris-playing-field' },
    providers: [

    ],
})
export class TetrisPlayingField {
    config = inject(GAME_CONFIG);
    snField = inject(TETRIS_FIELD_STATE);
    rectSize = 16;
    eff = effect(() => {
        const { fieldWidth: fieldWIdth, fieldHeight } = this.config;
        // clog('*** FIELD', { color: '#992200' }, printField(fieldWIdth, fieldHeight, this.snField()));
    });
}
