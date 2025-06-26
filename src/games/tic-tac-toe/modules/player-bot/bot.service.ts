import { computed, inject, InjectionToken, Signal } from "@angular/core";
import { IGameStrategy, IStrategyPluginDefinition } from "./types";
import { GAME_STORE } from "../../services/store/game.store";
import { TTT_STRATEGIES_PLUGIN_MANAGER } from "./strategy/plugin-manager";


export interface IStrategyInfo {
    id: string;
    label: string;
}

export interface IPlayerBotService {
    selectedStrategyId: Signal<string>;
    getStrategiesList(): IStrategyInfo[];
    getStrategy(id: string): IGameStrategy;
    selectStrategy(id: string): void;
}

export const PLAYER_BOT_SERVICE = new InjectionToken<IPlayerBotService>('PLAYER_BOT_SERVICE')

export class PlayerBotService implements IPlayerBotService {
    selectStrategy(id: string): void {
        this.store.setBotStrategy(id)
    }
    getStrategy(id: string): IGameStrategy {
        return this.pluginManager.getInstance(id);
    }
    private _strategyList!: IStrategyInfo[];
    getStrategiesList(): IStrategyInfo[] {
        if (!this._strategyList) {
            this._strategyList = this.pluginManager.getDefinitions().map(({ id, label }) => ({ id, label }))
        }
        return this._strategyList;
    }
    store = inject(GAME_STORE);
    pluginManager = inject(TTT_STRATEGIES_PLUGIN_MANAGER)
    selectedStrategyId = computed<string>(() => this.store.botStrategyId())
}