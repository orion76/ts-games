import { TCellCoord } from "@libs/common";

export type TRow<T extends unknown = boolean> = T[];
export type TField<T extends unknown = boolean> = TRow<T>[];
export type TGameStatus = 'start' | 'pause' | 'resume' | 'finish' | 'stop';
export interface IGameState {
    status: TGameStatus,
    fieldRecumbent: TField;
    cellsFalling: TCellCoord[] | undefined;
}
