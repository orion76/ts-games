import type { Meta, StoryObj } from '@storybook/angular';
import { BlockPagesComponent } from '../../../app/modules/block-pages/components/block-pages/block-pages.component';
import { TestStandBlockPagesComponent } from './test-stand/test-stand.component';

export const ActionsData = {
    viewWidth: '100px',
};

const meta: Meta<BlockPagesComponent> = {
    title: 'BlockPages/Pages',
    component: TestStandBlockPagesComponent,
    argTypes: {},
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    args: { ...ActionsData },
};

export default meta;
type Story = StoryObj<TestStandBlockPagesComponent>;
export const DirectionHorizontal: Story = {
    name: 'Direction/horizontal',
    args: {},
};

export const Pinned: Story = {
    args: {},
};
