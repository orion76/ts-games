import { TCellCoord } from "@libs/common";



export interface IGameResult {
    winner: string;
    cells?: [TCellCoord, TCellCoord, TCellCoord]
}

