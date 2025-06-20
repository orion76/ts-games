import { IPlugin } from "@orion76/plugin";
import { TCellCoord, TFieldState, UChar } from "./state";

export interface IStrategiOptions {
    field: TFieldState;
    myChar: UChar;
    opponentChar: UChar;
}

export interface IGameStrategy extends IPlugin {
    step(options: IStrategiOptions): TCellCoord;
}

export interface IGameResult {
    winner: string;
    cells?: [TCellCoord, TCellCoord, TCellCoord]
}

