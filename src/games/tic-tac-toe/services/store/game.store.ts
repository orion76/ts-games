import { computed, inject, InjectionToken } from "@angular/core";
import { patchState, signalStore, watchState, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { GAME_CONFIG } from "../../main.component";
import { CHAR_EMPTY, IGameState, IPlayerConfig, IStepData, TFieldState, TGameStatus, TPlayerIds, TStepStatusActive, UChar } from "../../types";
import { assertStepAndStatus } from "../../utils/asserts";
import { setCellValue } from "../../../../libs/cell-utils";
import { EGameStopReason, UGameStopReason } from "../game-management/types";
import { GAME_CONFIG_SERVICE } from "../players-config.service";
import { TGameStore } from "./types";
import { withBotState } from "../../modules/player-bot";

const EMPTY_FIELD: TFieldState = [
    [CHAR_EMPTY, CHAR_EMPTY, CHAR_EMPTY],
    [CHAR_EMPTY, CHAR_EMPTY, CHAR_EMPTY],
    [CHAR_EMPTY, CHAR_EMPTY, CHAR_EMPTY],
]

export const GAME_STORE = new InjectionToken<TGameStore>('GAME_STORE')

export const GameStore = signalStore(
    withBotState(),
    withHooks(({
        onInit(store) {
            watchState(store, ({ activePlayerIndex }: any) => {
                // console.log({ activePlayerIndex });
            });
        },
    })),
    withState<IGameState>(() => ({
        activePlayerIndex: 0,
        status: 'awaiting',
        currentStep: undefined,
        field: structuredClone(EMPTY_FIELD),
        players: inject(GAME_CONFIG_SERVICE).playerConfigs,
        steps: [],
        gameOver: false
    })),
    withProps((store) => ({
        config: inject(GAME_CONFIG),
    })),
    withComputed(({ activePlayerIndex, players, steps }) => ({
        activePlayer: computed(() => players()[activePlayerIndex()]),
        lastStep: computed(() => steps().slice(-1)[0]),
        stepsCount: computed(() => steps().length)
    })),
    withMethods((store) => ({
        setGameStop(reason: UGameStopReason): void {
            switch (reason.reason) {
                case EGameStopReason.STEPS_OVER:
                case EGameStopReason.WIN:
                    patchState(store, () => {
                        return ({ gameOver: reason })
                    })
                    break;
            }
        },
        currentStepCancel(): void {
            patchState(store, ({ currentStep, steps }) => {
                assertStepAndStatus(currentStep, 'awaiting');
                const step: IStepData = { ...currentStep, status: 'canceled' }
                return ({ currentStep: undefined, steps: [...steps, step], })
            })
        },
        doStep(step: IStepData): void {
            assertStepAndStatus(step, 'awaiting');
            patchState(store, () => ({ currentStep: step }))
        },
        setStatus: (value: TGameStatus) => patchState(store, () => ({ status: value })),
        setCurrentStepStatus(status: TStepStatusActive): void {
            patchState(store, ({ currentStep }) => {
                assertStepAndStatus(currentStep);
                return ({ currentStep: { ...currentStep, status } })
            })
        },
        stepFinish(): void {
            patchState(store, ({ currentStep, steps }) => {
                assertStepAndStatus(currentStep, 'completed')
                const step: IStepData = { ...currentStep }
                return ({ currentStep: undefined, steps: [...steps, step], })
            })
        },
        updateField() {
            patchState(store, ({ currentStep, field, players }) => {
                assertStepAndStatus(currentStep);
                return ({ field: updateField(field, { ...currentStep }, players) })
            })
        },
        setActivePlayerIndex(index: number): void {
              patchState(store, () => ({ activePlayerIndex: index }))
        },
        startNewGame(): void {
            patchState<IGameState>(store, () => ({
                activePlayerIndex: 0,
                field: structuredClone(EMPTY_FIELD),
                steps: [],
                gameOver: false,
            }));
        }
    }))
)

function getPlayerChar(id: TPlayerIds, players: IPlayerConfig[]): UChar {
    const player = players.find(({ playerId }) => id === playerId);
    if (!player) {
        throw new Error(`[Game Tik-Tak-Toe]: Player with plauerId:${id} is not found!`)
    }
    return player.char;
}

function updateField(field: TFieldState, step: IStepData, players: IPlayerConfig[]): TFieldState {
    const { cell, playerId } = step;
    return setCellValue(field, cell, getPlayerChar(playerId, players));
}

