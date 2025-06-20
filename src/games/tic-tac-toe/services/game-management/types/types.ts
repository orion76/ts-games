import { IStepData } from "../../../types";
import { UGameStopReason } from "./game-stop-reason";
import { UStepInvalidReason } from "./step-invalid-reason";

export interface IStepCheckService {
    isStepInvalid(step: IStepData): UStepInvalidReason | false;
    isGameStop(): UGameStopReason | false
}
