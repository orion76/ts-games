import { computed, inject } from "@angular/core";
import { TTT_STRATEGIES_PLUGIN_MANAGER } from "../../strategy/plugin-manager";
import { PlayerBase } from "../player-base";
import { TTT_PLAYER_PLUGIN_TYPE } from "../plugin-manager";

import { Plugin } from '@orion76/ng-plugin';
import { GAME_STORE } from "../../../services/store/game.store";
import { IGameStrategy } from "../../../types";
import { STRATEGY_ID_GIVEAWAYS } from "../../strategy/plugins/giveaways.strategy";
import { PlayerDeriver } from "../player.deriver";
import { IPlayerBotDefinition } from "../types";

export const PLAYER_BOT_TYPE = 'player-bot';

@Plugin({
    id: PLAYER_BOT_TYPE,
    type: TTT_PLAYER_PLUGIN_TYPE,
    label: 'Bot',
    deriverClass: PlayerDeriver,
    strategiId: STRATEGY_ID_GIVEAWAYS
})
export class Bot extends PlayerBase<IPlayerBotDefinition> {
    store = inject(GAME_STORE);
    private _strategy!: IGameStrategy;
    strategiesPluginManager = inject(TTT_STRATEGIES_PLUGIN_MANAGER);
    get strategy(): IGameStrategy {
        if (!this._strategy) {
            this._strategy = this.strategiesPluginManager.getInstance(this.definition.strategiId)
        }
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

