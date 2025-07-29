import { Component } from '@angular/core';
import { BlockPagesComponent } from '../../../../app/modules/block-pages/components/block-pages/block-pages.component';
import { BlockPageComponent } from '../../../../app/modules/block-pages/components/block-page/block-page.component';

@Component({
    selector: 'stories-test-stand-block-pages',
    standalone: true,
    styleUrls: ['test-stand.component.scss'],
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
    imports: [BlockPagesComponent, BlockPageComponent],
})
export class TestStandBlockPagesComponent {}
