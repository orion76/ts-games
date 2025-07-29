import { Component } from '@angular/core';
import { TetrisMainComponent } from '../../../games/tetris/main.component';

@Component({
    template: `
        <game--tetris--main />
    `,
    standalone: true,
    imports: [TetrisMainComponent],
})
export class TestStandPage {}
