import { Injectable, InjectionToken, signal } from '@angular/core';
import { IPlayControlService } from '../types';
import { UEvents } from '../types/common';


export type TPlayState = 'stop' | 'play';
export type TFigureMoveType = 'down' | 'left' | 'right';
export type TFigureRotateType = 'left' | 'right';

export const PLAY_CONTROL_SERVICE = new InjectionToken<IPlayControlService>('PLAY_CONTROL_SERVICE');

@Injectable()
export class PlayControlService implements IPlayControlService {
    readonly state = signal<TPlayState>('stop');
    readonly playEvent = signal<UEvents | null>(null, { equal: () => false });
    emitPlayEvent(name: UEvents) {
        this.playEvent.set(name);
    }
}
