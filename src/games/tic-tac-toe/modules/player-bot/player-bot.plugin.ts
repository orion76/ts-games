import { computed, effect, inject } from "@angular/core";
import { PlayerBase } from "../../plugins/player/player-base";
import { TTT_PLAYER_PLUGIN_TYPE } from "../../plugins/player/plugin-manager";
import { Plugin } from '@orion76/ng-plugin';
import { GAME_STORE } from "../../services/store/game.store";
import { PlayerDeriver } from "../../plugins/player/player.deriver";
import { TTT_STRATEGIES_PLUGIN_MANAGER } from "./strategy/plugin-manager";
import { STRATEGY_ID_GIVEAWAYS } from "./strategy/plugins/strategy-giveaways.plugin";
import { IGameStrategy, IPlayerBot, IPlayerBotDefinition } from "./types";

export const PLAYER_BOT_TYPE = 'player-bot';

@Plugin({
    id: PLAYER_BOT_TYPE,
    type: TTT_PLAYER_PLUGIN_TYPE,
    label: 'Bot',
    deriverClass: PlayerDeriver,
    strategiId: STRATEGY_ID_GIVEAWAYS
})
export class Bot extends PlayerBase<IPlayerBotDefinition> implements IPlayerBot {
    store = inject(GAME_STORE);
    private _strategy!: IGameStrategy;
    strategiesPluginManager = inject(TTT_STRATEGIES_PLUGIN_MANAGER);

    onStrategyIdChange = effect(() => {
        this._strategy = this.strategiesPluginManager.getInstance(this.store.botStrategyId())
    })

    get strategy(): IGameStrategy {
        return this._strategy;
    }

    private readonly player = computed(() => this.store.players().find((player) => player.type === this.type));
    private readonly opponent = computed(() => this.store.players().find((player) => player.type !== this.type));


    override setStepAvailable(available: boolean) {
        if (available) {
            const { playerId } = this;
            const field = this.store.field();
            const player = this.player();
            const opponent = this.opponent();
            if (!player || !opponent) {
                throw new Error('Something went wrong.')
            }
            const cell = this.strategy.step({ field, myChar: player.char, opponentChar: opponent.char });

            this.store.doStep({ cell, playerId, status: 'awaiting' })


        }
    }
}

