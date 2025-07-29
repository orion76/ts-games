import { map } from "rxjs";
import { IEventData, IStartEventData } from "./types";
import { ILogOptions } from "../utils/rxjs-operators";


function getElmenetOffsetFromParent(element: HTMLElement, parentLeft: number): number {
    const left = element.getBoundingClientRect().left;
    return left - parentLeft;
}


function extractEventData(event: Event): IEventData {
    // if (!(event.target instanceof HTMLElement)) {
    // throw new Error('Event target is not HTMLElement.');
    // }
    let x: number | undefined;

    if (isMouseEvent(event)) {
        x = event.x
    }
    if (isTouchEvent(event)) {
        x = event.changedTouches[0].clientX;
    }
    if (x === undefined) {
        throw new Error('The "x"-coordinate of the element cannot be undefined');
    }

    return { x, time: Date.now() } as IEventData
}
function extractStartEventData(event: Event & { target: HTMLElement }, containerOffset: number): IStartEventData {
    return {
        ...extractEventData(event),
        elOffset: getElmenetOffsetFromParent(event.target.parentElement!, containerOffset)
    }

}

export function getEventData() {
    return map(extractEventData);
}


export function getStartEventData(containerOffset: number) {
    return map((event: Event & { target: HTMLElement }) => extractStartEventData(event, containerOffset))
}


export function isMouseEvent(event: Event): event is MouseEvent {
    return 'x' in event;
}

export function isTouchEvent(event: Event): event is TouchEvent {
    return 'touches' in event;
}

export function isEventWithTarget(event: Event): event is Event & { target: HTMLElement } {
    return 'target' in event && event.target instanceof HTMLElement;
}


export function formatTranstateX(x: number) {
    return `translateX(${x}px)`;
}


export function clog(message: string, options?: ILogOptions, ...data: unknown[]) {
    let { outputStacktrace, color }: ILogOptions = options ?? {};

    const args = [message];
    if (color) {
        args[0] = '%c' + args[0];
        args.push(`color: ${color}`);
    }
    console.log(...args, ...data);
    if (outputStacktrace) {
        console.trace()
    }
}

const _TIMER_LOG = new Map<string, number>();

export function tlog(tag: string, suffix?: string, print = true) {
    const start = _TIMER_LOG.get(tag);
    if (!start) {
        _TIMER_LOG.set(tag, Date.now());
    } else if (print) {
        const time = Date.now() - start;
        clog(`---t ${tag}`, { color: '#ff9999' }, time, suffix ?? '')
    }
}