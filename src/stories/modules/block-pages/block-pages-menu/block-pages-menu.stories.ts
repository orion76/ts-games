import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { BlockPagesMenuComponent } from '../../../../app/modules/block-pages/components/menu/block-pages-menu.component';
import { IMenuItemData } from '../../../../app/modules/block-pages/components/menu/types';

const items: IMenuItemData[] = [
    { icon: 'star', title: 'Star', description: 'Is Star icon' },
    { icon: 'key', title: 'Key', description: 'Is Key icon' },
    { icon: 'settings_applications', title: 'Settings', description: 'Is Settings icon' },
    { icon: 'token', title: 'Token', description: 'Is Token icon' },
];

const meta: Meta<BlockPagesMenuComponent> = {
    title: 'BlockPages/Menu',
    component: BlockPagesMenuComponent,
    argTypes: {
        direction: { control: 'select', options: ['horizontal', 'vertical', 'custom'] },
    },
    tags: ['!autodocs'],
    decorators: [
        (story, context) => ({
            template: `
            <div class="storybook--block-pages-menu-wrapper">
                <block-pages-menu ${argsToTemplate(context.args)}></block-pages-menu>
            </div>`,
            props: context.args,
        }),
    ],
};

export default meta;
type Story = StoryObj<BlockPagesMenuComponent>;

export const directionHorizontal: Story = {
    name: 'direction: horizontal',
    args: {
        items,
        direction: 'horizontal',
        itemConfig: {
            showTitle: true,
            iconPositionEnd: false,
        },
    },
};

export const directionVertucal: Story = {
    name: 'direction: vertical',

    args: {
        items,
        direction: 'vertical',
    },
};
