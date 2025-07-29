/**
 * Test author: copilot
 * Model: GitHub Copilot (GPT-4o, July 2025)
 */
import { signal } from '@angular/core';
import { startDynamicInterval } from '@src-root/games/tetris/services/tick';


describe('startDynamicInterval', () => {
    it('should call fn periodically until isStop becomes true', (done) => {
        const CALL_COUNT = 3;

        const isStop = signal(false);
        const period = signal(100); // 10ms
        let callTimes: number[] = [];
        function fn() {
            callTimes.push(Date.now())
            if (callTimes.length === CALL_COUNT) {
                isStop.set(true);
            }
        }
        startDynamicInterval(isStop, period, fn);
        setTimeout(() => {
            expect(callTimes.length === CALL_COUNT).toBeTrue();
            done();
        }, CALL_COUNT * period() + period());
    });
    it('call interval should be correct', (done) => {
        const CALL_COUNT = 3;
        const TIME_START = Date.now();
        const isStop = signal(false);
        const period = signal(100);
        const ADD_TIME = 20;

        let callTimes: number[] = [];
        function fn() {
            callTimes.push(Date.now())
            if (callTimes.length === CALL_COUNT) {
                isStop.set(true);
            }
        }
        startDynamicInterval(isStop, period, fn);
        setTimeout(() => {
            const interval_0 = callTimes[0] - TIME_START;
            const period_0 = (period() * 1);
            // console.log('--0', interval_0, period_0);
            expect(interval_0 >= period_0).withContext('call 0').toBeTrue();

            const interval_1 = callTimes[1] - TIME_START;
            const period_1 = (period() * 2);
            // console.log('--1', interval_1, period_1);
            expect(interval_1 >= period_1).withContext('call 1').toBeTrue();

            const interval_2 = callTimes[2] - TIME_START;
            const period_2 = (period() * 3);
            // console.log('--2', interval_2, period_2);
            expect(interval_2 >= period_2).withContext('call 2').toBeTrue();
            done();
        }, CALL_COUNT * period() + ADD_TIME);
    });
});
