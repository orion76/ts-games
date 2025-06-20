import { IStepData } from "../../../types";

export enum EStepInvalidReason {
    DUPLICATE = 'duplicate',
}

export interface IStepInvalidReason {
    reason: EStepInvalidReason
}

export interface IStepInvalidReasonDuplicate extends IStepInvalidReason, IStepData {
    reason: EStepInvalidReason.DUPLICATE;
}

export type UStepInvalidReason = IStepInvalidReasonDuplicate;

