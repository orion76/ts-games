import { Component } from '@angular/core';
import { BlockPageComponent } from '../../modules/block-pages/components/block-page/block-page.component';
import { BlockPagesComponent } from '../../modules/block-pages/components/block-pages/block-pages.component';

@Component({
    selector: 'block-pages--test-stand',
    template: `
        <block-pages>
            <block-page class="block block1">
                <h1>Блок 1</h1>
                <p>Это первый блок. Свайпните влево, чтобы перейти ко второму блоку.</p>
            </block-page>
            <block-page class="block block2">
                <h1>Блок 2</h1>
                <p>Это второй блок. Свайпните вправо, чтобы вернуться к первому блоку.</p>
            </block-page>
            <block-page class="block block3">
                <h1>Блок 3</h1>
                <p>Это второй блок. Свайпните вправо, чтобы вернуться к первому блоку.</p>
            </block-page>
            <block-page class="block block4">
                <h1>Блок 4</h1>
                <p>Это второй блок. Свайпните вправо, чтобы вернуться к первому блоку.</p>
            </block-page>
        </block-pages>
    `,
    styleUrl: './test-stand.component.scss',
    imports: [BlockPageComponent, BlockPagesComponent],
})
export class BlockPagesComponentTestStand {}
