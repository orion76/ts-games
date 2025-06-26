import { map, tap } from "rxjs";
import { IEventData, Maybe } from "./types";

export function getEventData() {
    return map((event: Event) => {
        let x = 0;
        if (isMouseEvent(event)) {
            x = event.x
        }
        if (isTouchEvent(event)) {
            x = event.changedTouches[0].clientX
        }
        return { x, time: Date.now() } as IEventData
    })

}

export function isMouseEvent(event: Event): event is MouseEvent {
    return 'x' in event;
}

export function isTouchEvent(event: Event): event is TouchEvent {
    return 'touches' in event;
}

export function compareEvents(a: IEventData, b: IEventData) {
    return a.x === b.x;
}

export function compareTupleEvents([a0, a1]: [IEventData, IEventData], [b0, b1]: [IEventData, IEventData]) {
    return compareEvents(a0, b0) && compareEvents(a1, b1);
}

export function formatTranstateX(x: number) {
    return `translateX(${x}vw)`;
}



export function calcMoveTranslateX(move: number, windowWidth: number, currentSlide: number, total: number): Maybe<number> {
    let result: Maybe<number> = undefined;

    const directionLeft = move < 0 && move > -windowWidth;
    const directionRight = move > 0 && move < windowWidth;
    const slideNotEnd = currentSlide < (total - 1);
    const slideNotStart = currentSlide > 0;

    if ((directionLeft && slideNotEnd) || (directionRight && slideNotStart)) {
        result = (move / windowWidth - currentSlide) * 100;

    }

    return result;
}