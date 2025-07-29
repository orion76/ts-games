import { Signal } from '@angular/core';
import { UEvents } from './common';
import { IPlayerData } from './config';


export interface IConfigService {
    getById(playerId: string): IPlayerData;
    getByType(type: string): IPlayerData;
    playerConfigs: IPlayerData[];
}

export interface IGameService {
    // field: Signal<TFieldState>;
}
export interface IPlayControlService {
    emitPlayEvent(name: UEvents): void;
    readonly playEvent: Signal<UEvents | null>
}
