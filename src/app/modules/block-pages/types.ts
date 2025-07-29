export type TSwipeDirection = 'right' | 'left';
export type TElementDirection = 'horizontal' | 'vertical' | 'custom';
export type TElementPlace = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'custom';
export type TElementSlot = 'start' | 'center' | 'end' | 'custom';

export interface IEventData {
    x: number;
    time: number;
}

export interface IStartEventData extends IEventData {
    elOffset: number;
}

export type Maybe<T> = T | undefined;

export interface ISwipeData {
    offset: number;
    time: number;
}
