import { inject, Injectable, InjectionToken, Signal, signal } from "@angular/core";
import { IConfigService, IPlayerConfig } from "../types";
import { GAME_CONFIG } from "../main.component";


export const GAME_CONFIG_SERVICE = new InjectionToken<IConfigService>('GAME_CONFIG_SERVICE');


@Injectable()
export class ConfigService implements IConfigService {
    get playerConfigs(): IPlayerConfig[] {
        return this.config.players;
    };


    config = inject(GAME_CONFIG);

    getById(playerId: string): IPlayerConfig {
        const config = this.playerConfigs.find((c) => c.playerId === playerId);
        if (!config) {
            throw new Error(`Player config not found. Player ID: ${playerId}`);
        }
        return config;
    }

    getByType(type: string): IPlayerConfig {
        const config = this.playerConfigs.find((c) => c.type === type);
        if (!config) {
            throw new Error(`Player config not found. Player Type: ${type}`);
        }
        return config;
    }
}