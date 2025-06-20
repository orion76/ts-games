import { computed, effect, inject, Injectable, InjectionToken, Signal, signal } from "@angular/core";
import { TTT_PLAYER_PLUGIN_MANAGER } from "../../plugins/player";
import { IGameService } from "../../types";
import { IGameResult } from "../../types/common";
import { GAME_CONFIG_SERVICE } from "../players-config.service";
import { GAME_STORE } from "../store/game.store";
import { STEP_CHECK_SERVICE } from "./step-check.service";

export const GAME_SERVICE = new InjectionToken<IGameService>('GAME_SERVICE');


@Injectable()
export class GameService implements IGameService {
    private stepCounter = 0;
    private readonly config = inject(GAME_CONFIG_SERVICE);
    private readonly stepChekService = inject(STEP_CHECK_SERVICE);
    private readonly store = inject(GAME_STORE);
    private readonly playerPluginManager = inject(TTT_PLAYER_PLUGIN_MANAGER);
    private readonly activePlayer = computed(() => this.getPlayer(this.store.activePlayerIndex()));


    getPlayer(index: number) {
        const config = this.store.players()[index];
        const player = this.playerPluginManager.getInstance(config.playerId);
        return player;
    }


    players = computed(() => {
        return this.store.players().map((({ playerId }) => this.playerPluginManager.getInstance(playerId)));
    })

    initPlayers = effect(() => {
        const players = this.players();
        players.forEach(player => {
            const step = player.onStep();
            if (step) {
                this.store.doStep(step)
            }
        })
    })
    stepController = effect(() => {

        const currentStep = this.store.currentStep();
        if (!currentStep) {
            return;
        }

        switch (currentStep.status) {
            case 'canceled':
                throw new Error('Еhe current step cannot be "canceled"')
                break;
            /**
             * Первый ход, 
             * или предыдущий ход окончен, следующий не начат.
             */
            case 'awaiting':
                this.stepCounter++;
                if (this.stepChekService.isStepInvalid(currentStep)) {
                    this.store.setCurrentStepStatus('started');
                } else {
                    this.store.currentStepCancel();
                }
                break;
            case 'started':
                this.store.setCurrentStepStatus('progress');
                break;
            case 'progress':
                this.store.updateField();
                this.store.setCurrentStepStatus('completed');
                break;
            case 'completed':
                const gameStop = this.stepChekService.isGameStop();
                this.store.stepFinish();
                if (gameStop) {
                    this.store.setGameStop(gameStop);
                    this.stepCounter = 0
                } else {

                    this.store.setActivePlayerIndex(1 ^ this.store.activePlayerIndex());
                    this.activePlayer().setStepAvailable(true);
                }

                break;
        }

    })

    gameController = effect(() => {

        switch (this.store.status()) {
            /**
             * Игра не началась.
             * Стартуем.
             */
            case 'awaiting':
                this.store.setStatus('started');
                break;

            /**
             * Инициализация игры
             */
            case 'started':
                this.activePlayer().setStepAvailable(true);
                this.store.setStatus('progress');
                break;
            case 'progress':
                break;
            case 'completed':
                break;
        }

        // const step = activePlayer.makeStep(this.state.state());
        // if (step) {
        //     this.state.nextStep(step);
        // }

    })


    gameOver = signal<IGameResult | undefined>(undefined);

    get isGameOver(): Signal<IGameResult | undefined> {
        return this.gameOver;
    }


    checkIsGameOver(): IGameResult | undefined {
        // const emptyCells = getEmptyCells(this.field());
        // if (emptyCells.length === 0) {
        //     return { winner: 'draw' };
        // }
        return;
    }
}