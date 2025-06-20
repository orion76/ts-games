import { IStepData, TStepStatus } from "../types";


export function assertStepAndStatus(step: IStepData | undefined, status?: TStepStatus): asserts step is IStepData {
    if (!step) {
        throw new Error('[TTT] step is empty.');
    }
    if (status && step.status !== status) {
        throw new Error(`[TTT] step.status  should be "${status}". Status "${step.status}" is wrong.`);
    }
}
