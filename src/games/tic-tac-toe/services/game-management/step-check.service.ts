import { inject, Injectable, InjectionToken } from "@angular/core";
import { CHAR_EMPTY, IStepData } from "../../types";


import { GAME_STORE } from "../store/game.store";
import { FIELD_CELLS_COUNT } from "./constants";
import { IStepCheckService, UStepInvalidReason, EStepInvalidReason, UGameStopReason, EGameStopReason } from "./types";
import { assertStepAndStatus } from "../../utils/asserts";
import { findLinesByCharCount } from "../../utils/field-result";
import { getCellValue } from "@libs/cell-utils";

export const STEP_CHECK_SERVICE = new InjectionToken<IStepCheckService>('STEP_CHECK_SERVICE');

@Injectable()
export class StepCheckService implements IStepCheckService {
    store = inject(GAME_STORE);

    isStepInvalid(step: IStepData): UStepInvalidReason | false {
        let reason: UStepInvalidReason | false = false;
        if (this.stepIsNotDuplicate(step)) {
            reason = { reason: EStepInvalidReason.DUPLICATE, ...step }
        }
        return reason
    }

    isGameStop(): UGameStopReason | false {

        if (this.gameStepsOver()) {
            return { reason: EGameStopReason.STEPS_OVER };
        }

        const winLines = this.gameWin();
        if (winLines.length > 0) {
            const step = this.store.currentStep();
            assertStepAndStatus(step, 'completed');
            return { reason: EGameStopReason.WIN, lines: winLines, playerId: step.playerId };
        }

        return false;
    }

    /*********************************************************
     * GAME CHECK
     */

    private gameStepsOver(): boolean {
        return this.store.stepsCount() === FIELD_CELLS_COUNT;
    }

    private gameWin(): number[] {
        const field = this.store.field();
        const { char } = this.store.activePlayer();
        return findLinesByCharCount(field, char, 3)
    }

    /*********************************************************
     * STEP CHECK
     */

    private stepIsNotDuplicate({ cell }: IStepData) {
        return getCellValue(this.store.field(), cell) === CHAR_EMPTY
    }
}