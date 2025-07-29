import { Injectable, InjectionToken, Signal, signal } from '@angular/core';
import { ITickService } from './types';
import { periodToSpeed, speedToPeriod, startDynamicInterval } from './utils';

export const TICK_SERVICE = new InjectionToken<ITickService>('TICK_SERVICE');
export const EMPTY_PERIOD = 0;

@Injectable()
export class TickService implements ITickService {
    private readonly _tick = signal<boolean>(false, { equal: () => false })
    private _period = EMPTY_PERIOD;
    private _isExecuted = false;
    private _isPaused = false;

    get period() {
        return this._period;
    }

    get isExecuted() {
        return this._isExecuted;
    }

    get isPaused() {
        return this._isPaused;
    }
    get tick(): Signal<boolean> {
        return this._tick.asReadonly()
    }

    /**
     * 
     * @param speed 
     */
    setSpeed(speed: number): void {
        this._period = speedToPeriod(speed);
    }

    addSpeed(add: number): void {
        const speed = periodToSpeed(this.period);
        this._period = speedToPeriod(speed + add);
    }
    private _periodClear() {
        this._period = EMPTY_PERIOD;
    }
    start(startSpeed: number): void {
        this.setSpeed(startSpeed);
        this._start();
    }
    pause(): void {
        this._isPaused = true;
    }
    resume(): void {
        this._isPaused = false;
        this._start();
    }
    _start() {
        const { isExecuted, isPaused, period } = this;
        if (isExecuted === true) {
            throw new Error('Tick already executed.');
        }
        startDynamicInterval(this, () => this._tick.set(true));
    }
    stop(): void {
        this._isPaused = false;
        this._isExecuted = false;
        this._periodClear();
    }
}
