import { IStepData } from "../../../types";

export enum EGameStopReason {
    STEPS_OVER = 'steps-over',
    WIN = 'win',
}

export interface IGameStopReason {
    reason: EGameStopReason
}

export interface IGameStopReasonStepsOver extends IGameStopReason {
    reason: EGameStopReason.STEPS_OVER;
}

export interface IGameStopReasonWin extends IGameStopReason {
    reason: EGameStopReason.WIN;
    playerId: string;
    lines: number[]
}

export type UGameOverReason = IGameStopReasonStepsOver | IGameStopReasonWin
export type UGameStopReason = UGameOverReason