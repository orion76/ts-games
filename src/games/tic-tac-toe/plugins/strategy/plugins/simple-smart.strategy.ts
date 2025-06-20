import { inject } from "@angular/core";
import { NgPluginBase, Plugin } from "@orion76/ng-plugin";
import { GAME_CONFIG } from "../../../main.component";
import { getEmptyCells, getRandomItem } from "../../../services/utils";
import { IGameStrategy, IStrategiOptions, TCellCoord } from "../../../types";
import { TTT_STRATEGIES_PLUGIN_TYPE } from "../plugin-manager";
import { getLinesWithCellFilledCount } from "../utils";

export const STRATEGY_ID_SIMPLE_SMART = 'simple-smart'

@Plugin({
    id: STRATEGY_ID_SIMPLE_SMART,
    label: 'Simple smart strategy',
    type: TTT_STRATEGIES_PLUGIN_TYPE
})
export class SimpleRandomStrategy extends NgPluginBase implements IGameStrategy {
    config = inject(GAME_CONFIG)
    step({ field, myChar, opponentChar }: IStrategiOptions): TCellCoord {
        let result: TCellCoord | undefined;
        debugger;
        /**
         * Если остался последних ход, завершаем игру победой
         */
        const myDoubleCandidates = getLinesWithCellFilledCount(field, myChar, 2);
        if (myDoubleCandidates.length > 0) {
            // result = getRandomItem(myDoubleCandidates);
        }

        if (result) {
            return result;
        }

        /**
         * Если у оппонента остался последний ход, пытаемся ему помешать
         */
        const opponentDoubleCandidates = getLinesWithCellFilledCount(field, opponentChar, 2);
        if (opponentDoubleCandidates.length > 0) {
            // result = getRandomItem(myDoubleCandidates);
        }

        if (result) {
            return result;
        }


        const myNotEmptyLines = getLinesWithCellFilledCount(field, myChar, 1);
        if (myNotEmptyLines.length > 0) {
            // result = getRandomItem(myNotEmptyLines);
        }

        if (result) {
            return result;
        }

        return getRandomItem(getEmptyCells(field))!;
    }
}

