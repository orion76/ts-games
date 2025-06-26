import { NgPluginBase, Plugin } from "@orion76/ng-plugin";

import { TTT_STRATEGIES_PLUGIN_TYPE } from "../plugin-manager";
import { arraysDifferenceLeft, arraysIntersection, getLinesWithCellFilledCount } from "../utils";
import { getEmptyCells, getRandomItem } from "../../../../services/utils";
import { TCellCoord } from "../../../../types";
import { IGameStrategy, IStrategiOptions } from "../../types";


export const STRATEGY_ID_GIVEAWAYS = 'giveaways'

@Plugin({
    id: STRATEGY_ID_GIVEAWAYS,
    label: 'Giveaways',
    type: TTT_STRATEGIES_PLUGIN_TYPE
})
export class StrategyGiveaways extends NgPluginBase implements IGameStrategy {
    step({ field, myChar: charMy, opponentChar: charOpponent }: IStrategiOptions): TCellCoord {
        const emptyCells = getEmptyCells(field);
        let forbiddenSteps: TCellCoord[] = [];
        /**
         * Сюда точно не ходим
         */
        const myDoubleFilledLines = getLinesWithCellFilledCount(field, charMy, 2).flat();
        if (myDoubleFilledLines.length > 0) {
            forbiddenSteps = forbiddenSteps.concat(arraysIntersection(emptyCells, myDoubleFilledLines));
        }

        /**
         * Сюда тоже не ходим
         */
        let opponentDoubleFilledLines = getLinesWithCellFilledCount(field, charOpponent, 2).flat();
        if (opponentDoubleFilledLines.length > 0) {
            opponentDoubleFilledLines = arraysDifferenceLeft(opponentDoubleFilledLines, forbiddenSteps);
            forbiddenSteps = forbiddenSteps.concat(arraysIntersection(emptyCells, opponentDoubleFilledLines));
        }
        
        const allowedSteps = arraysDifferenceLeft(emptyCells, forbiddenSteps)

        if (allowedSteps.length > 0) {
            return getRandomItem(allowedSteps)
        }


        return getRandomItem(emptyCells)!;
    }
}

