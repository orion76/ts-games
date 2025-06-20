import { Signal } from "@angular/core";
import { IGameResult } from "./common";
import { IPlayerConfig } from "./config";

export interface IConfigService {
    getById(playerId: string): IPlayerConfig;
    getByType(type: string): IPlayerConfig;
    playerConfigs: IPlayerConfig[];
}

export interface IGameService {
    // field: Signal<TFieldState>;
    isGameOver: Signal<IGameResult | undefined>
}