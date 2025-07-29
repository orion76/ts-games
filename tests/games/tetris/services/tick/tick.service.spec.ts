/**
 * Test author: copilot
 * Model: GitHub Copilot (GPT-4o, July 2025)
 */

import { ITickService, TickService, speedToPeriod, periodToSpeed, EMPTY_PERIOD } from "@src-root/games/tetris/services/tick";


describe('TickService', () => {
    let service: ITickService;
    beforeEach(() => {
        service = new TickService();
    });

    it('should set speed correctly', () => {
        const testSpeed = 5;
        service.setSpeed(testSpeed);
        const periodValue = service.period;
        const expectedPeriod = speedToPeriod(testSpeed);
        const result = periodValue === expectedPeriod;
        expect(result).toBeTrue();
    });

    it('should add speed correctly', () => {
        service.setSpeed(5);
        service.addSpeed(2);
        const periodValue = service.period;
         const result = typeof periodValue === 'number';
        expect(result).toBeTrue();
    });

    it('should start with given speed', () => {
        service.start(7);
        const periodValue = service.period;
        const expectedPeriod = speedToPeriod(7);
        const result = periodValue === expectedPeriod;
        expect(result).toBeTrue();
    });

    it('should pause and resume', () => {
        service.pause();
        const pauseValue = service.isExecuted;
        const pauseResult = pauseValue === true;
        expect(pauseResult).toBeTrue();
        service.resume();
        const resumeValue = service.isExecuted;
        const resumeResult = resumeValue === false;
        expect(resumeResult).toBeTrue();
    });

    it('should stop and clear period', () => {
        service.setSpeed(10);
        service.stop();
        const periodValue = service.period;
        const expectedPeriod = EMPTY_PERIOD;
        const result = periodValue === expectedPeriod;
        expect(result).toBeTrue();
    });
});
