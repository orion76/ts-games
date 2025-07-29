import { Component } from '@angular/core';
import { BlockPagesMenuComponent } from '../../modules/block-pages/components/menu/block-pages-menu.component';
import { IMenuItemConfig, IMenuItemData } from '../../modules/block-pages/components/menu/types';
import { TElementDirection, TElementPlace, TElementSlot } from '../../modules/block-pages/types';

@Component({
    selector: 'block-pages-menu--test-stand',
    template: `
        <div [class]="wrapperClasses()">
            <block-pages-menu [items]="items" [itemConfig]="itemConfig" [direction]="direction"></block-pages-menu>
        </div>
    `,
    styleUrl: './test-stand.component.scss',
    imports: [BlockPagesMenuComponent],
})
export class BlockPagesMenuComponentTestStand {
    items: IMenuItemData[] = [
        { icon: 'star', title: 'Star', description: 'Is Star icon' },
        { icon: 'key', title: 'Key', description: 'Is Key icon' },
        { icon: 'settings_applications', title: 'Settings', description: 'Is Settings icon' },
        { icon: 'token', title: 'Token', description: 'Is Token icon' },
    ];
    itemConfig: IMenuItemConfig = {
        showTitle: true,
        iconPositionEnd: true,
    };
    direction: TElementDirection = 'horizontal';

    place: TElementPlace = 'left';
    slot?: TElementSlot;

    wrapperClasses() {
        const classes = ['block-pages-menu--wrapper'];
        if (this.place) {
            classes.push(`place-${this.place}`);
        }
        if (this.slot) {
            classes.push(`slot-${this.slot}`);
        }
        return classes.join(' ');
    }
}
