import { Component, computed, InjectionToken, input } from '@angular/core';
import { TElementDirection } from '../../types';
import { BlockPagesMenuItemComponent } from '../menu-item/block-pages-menu-item.component';
import { IMenuItemConfig, IMenuItemData } from './types';

export const BLOCK_PAGE_WIDTH = new InjectionToken<number>('BLOCK_PAGE_WIDTH');

@Component({
    selector: 'block-pages-menu',
    template: `
        @let menuItemConfig = itemConfig();
        @let activeItemIndex = activeIndex();
        @for (item of items(); track $index; let index = $index) {
            <block-pages-menu-item [item]="item" [itemConfig]="menuItemConfig" [isActive]="activeItemIndex === index"></block-pages-menu-item>
        }
    `,
    styleUrl: 'block-pages-menu.component.scss',
    imports: [BlockPagesMenuItemComponent],
    host: {
        '[class]': 'getStyleClass()',
    },
})
export class BlockPagesMenuComponent {
    styleName = input<string>('default');
    direction = input<TElementDirection>('horizontal');
    activeIndex = input<number>(0);
    itemConfig = input<IMenuItemConfig>({});
    items = input<IMenuItemData[]>();

    isIconPositionEnd = computed(() => this.itemConfig().iconPositionEnd);

    getStyleClass() {
        return `block-pages-menu style-${this.styleName()} direction-${this.direction()}`;
    }

    showTitle(item: IMenuItemData) {
        const config = this.itemConfig();
        const output = item.title && config.showTitle;

        return output;
    }
}
