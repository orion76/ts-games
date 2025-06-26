import { IPlugin } from "@orion76/plugin";
import { TCellCoord, TFieldState, UChar } from "./state";


export interface IGameResult {
    winner: string;
    cells?: [TCellCoord, TCellCoord, TCellCoord]
}

