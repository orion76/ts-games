import { UGameOverReason } from "../services/game-management/types";
import { IGameConfig, IPlayerConfig, TPlayerIds } from "./config";

export const CHAR_CROSS = 'X';
export const CHAR_ZERO = 'O';
export const CHAR_EMPTY = '-';


export type UChar = typeof CHAR_CROSS | typeof CHAR_ZERO | typeof CHAR_EMPTY;


export type TFieldRowState = UChar[];
export type TFieldState = TFieldRowState[];
export type TCellCoord = [number, number];

export type TStepStatusActive = 'started' | 'progress' | 'completed'
export type TStepStatusPassive = 'awaiting' | 'canceled'
export type TStepStatus = TStepStatusActive | TStepStatusPassive


export interface IStepData {
    cell: TCellCoord,
    playerId: TPlayerIds,
    status: TStepStatus
}

export type TGameStatus = 'started' | 'progress' | 'completed' | 'awaiting'


export interface IGameState {
    activePlayerIndex: number,
    status: TGameStatus,
    currentStep: IStepData | undefined,
    // config?: IGameConfig,
    players: IPlayerConfig[],
    field: TFieldState;
    steps: IStepData[];
    gameOver: UGameOverReason | false
}

