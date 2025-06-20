import { Signal, WritableSignal } from "@angular/core";
import { IPlugin, IPluginDefinition } from "@orion76/plugin";
import { IPlayerConfig, TPlayerIds } from "../../types";
import { IGameState, IStepData, TCellCoord, UChar } from "../../types/state";

export interface IPlayerDefinition extends IPluginDefinition, IPlayerConfig {

}

export interface IPlayerBotDefinition extends IPlayerDefinition {
    strategiId: string;
}


export interface IPlayerHumanDefinition extends IPlayerDefinition {

}

export interface IMakeStepOptions {
    cell?: TCellCoord,
    state?: IGameState
}

export interface IPlayer<D extends IPlayerDefinition = IPlayerDefinition> extends IPlugin {
    char: UChar;
    definition: D;
    stepAvailable: WritableSignal<boolean>;
    setStepAvailable(available: boolean): void;
    onStep: Signal<IStepData | undefined>;
    playerId: TPlayerIds;

}

export interface IPlayerHuman extends IPlayer<IPlayerHumanDefinition> {

}
export interface IPlayerBot extends IPlayer<IPlayerBotDefinition> {

}