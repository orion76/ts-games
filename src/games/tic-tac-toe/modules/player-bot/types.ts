import { IPlugin, IPluginDefinition } from "@orion76/plugin";
import { IPlayer, IPlayerDefinition } from "../../plugins/player/types";
import { TFieldState, UChar } from "../../types";
import { TCellCoord } from "@libs/common";


export interface IStrategiOptions {
    field: TFieldState;
    myChar: UChar;
    opponentChar: UChar;
}

export interface IGameStrategy extends IPlugin {
    step(options: IStrategiOptions): TCellCoord;
}

export interface IStrategyPluginDefinition extends IPluginDefinition<IGameStrategy> {

}

export interface IBotState {
    botStrategyId: string;
}

export interface IPlayerBotDefinition extends IPlayerDefinition {

}
export interface IPlayerBot extends IPlayer<IPlayerBotDefinition> {

}