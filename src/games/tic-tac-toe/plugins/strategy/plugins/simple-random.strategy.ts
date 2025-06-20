import { inject } from "@angular/core";
import { NgPluginBase, Plugin } from "@orion76/ng-plugin";
import { GAME_CONFIG } from "../../../main.component";
import { getEmptyCells, getRandomItem } from "../../../services/utils";
import { IGameStrategy, IStrategiOptions, TCellCoord } from "../../../types";
import { TTT_STRATEGIES_PLUGIN_TYPE } from "../plugin-manager";

export const STRATEGY_ID_SIMPLE_RANDOM = 'simple-random'

@Plugin({
    id: STRATEGY_ID_SIMPLE_RANDOM,
    label: 'Simple random strategy',
    type: TTT_STRATEGIES_PLUGIN_TYPE
})
export class SimpleRandomStrategy extends NgPluginBase implements IGameStrategy {
    config = inject(GAME_CONFIG)
    step({ field }: IStrategiOptions): TCellCoord {
        return getRandomItem(getEmptyCells(field))!;
    }
}