import { TCellCoord } from '@libs/common';
import { getRandomItem } from '@libs/random';
import { NgPluginBase, Plugin } from '@orion76/ng-plugin';
import { getEmptyCells } from '../../../../services/utils';
import { IGameStrategy, IStrategiOptions } from '../../types';
import { TTT_STRATEGIES_PLUGIN_TYPE } from '../plugin-manager';

export const STRATEGY_ID_SIMPLE_RANDOM = 'simple-random';

@Plugin({
    id: STRATEGY_ID_SIMPLE_RANDOM,
    label: 'Simple random',
    type: TTT_STRATEGIES_PLUGIN_TYPE,
})
export class StrategySimpleRandom extends NgPluginBase implements IGameStrategy {
    step({ field }: IStrategiOptions): TCellCoord {
        return getRandomItem(getEmptyCells(field))!;
    }
}
