import { CommonModule } from '@angular/common';
import { Component, computed, InjectionToken, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { IMenuItemConfig, IMenuItemData } from './types';

export const BLOCK_PAGE_WIDTH = new InjectionToken<number>('BLOCK_PAGE_WIDTH');

@Component({
    selector: 'block-pages-menu-item',
    template: `
        @let menuItemConfig = itemConfig();
        @let itemData = item();
        <button
            mat-button
            [class.menu-item]="true"
            [class.has-title]="menuItemConfig.showTitle"
            [class.only-icon]="!menuItemConfig.showTitle"
            [class.active]="isActive()"
            [attr.aria-label]="itemData.description">
            @if (itemData.icon && isIconPositionEnd()) {
                <mat-icon iconPositionEnd class="menu-item__icon">{{ itemData.icon }}</mat-icon>
            }
            @if (itemData.icon && !isIconPositionEnd()) {
                <mat-icon class="menu-item__icon">{{ itemData.icon }}</mat-icon>
            }
            @if (isShowTitle(itemData)) {
                <span class="menu-item__title">{{ itemData.title }}</span>
            }
        </button>
    `,
    styleUrl: 'block-pages-menu-item.component.scss',
    imports: [MatIcon, MatButton, MatIconModule, CommonModule],
})
export class BlockPagesMenuItemComponent {
    isActive = input<boolean>(false);
    itemConfig = input<IMenuItemConfig>({});
    item = input.required<IMenuItemData>();

    isIconPositionEnd = computed(() => this.itemConfig().iconPositionEnd);

    isShowTitle(item: IMenuItemData) {
        const config = this.itemConfig();
        const output = item.title && config.showTitle;

        return output;
    }
}
