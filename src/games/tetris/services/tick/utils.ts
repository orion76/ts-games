import { IDynamicIntervalOptions } from "./types";



export function startDynamicInterval(options: IDynamicIntervalOptions, fn: () => void): void {

    function dynamicInterval(): void {
        const { isExecuted, isPaused, period } = options;
        if (isExecuted && !isPaused) {
            setTimeout(() => {
                fn();
                dynamicInterval();
            }, period)
        }
    };
    dynamicInterval();
}

/**
 * 1000 - 1
 *  500 - 2
 *  100 - 10
 */
export function speedToPeriod(speed: number): number {
    return Math.floor((1000000 / speed)) / 1000;
}
export function periodToSpeed(perid: number): number {
    return Math.floor(1000000 / perid) / 1000;
}
