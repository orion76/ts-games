import { Signal } from "@angular/core";

export interface IDynamicIntervalOptions {
    isExecuted: boolean;
    isPaused: boolean;
    period: number;
}

export interface ITickService extends IDynamicIntervalOptions {
    readonly tick: Signal<boolean>;
    setSpeed(speed: number): void;
    addSpeed(add: number): void;
    start(startSpeed: number): void;
    pause(): void
    resume(): void
    stop(): void
}