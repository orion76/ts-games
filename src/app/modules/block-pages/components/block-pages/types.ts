import { TElementPlace, TElementSlot, TElementDirection } from '../../types';
import { IMenuItemConfig, IMenuItemData } from '../menu/types';

export interface IMenuConfig {
    place?: TElementPlace;
    slot?: TElementSlot;
    direction?: TElementDirection;
    itemConfig?: IMenuItemConfig;
    items: IMenuItemData[];
}
