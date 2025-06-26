import { Component, effect, ElementRef, inject, signal, ViewChild } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map, Observable, shareReplay, Subject, switchMap, takeUntil, tap, withLatestFrom } from "rxjs";
import { WINDOW } from "../../../providers/window.provider";
import { filterUndefined, ignoreError, log } from "../../../utils/rxjs-operators";
import { IEventData, Maybe, TSwipeDirection } from "../../types";
import { calcMoveTranslateX, formatTranstateX, getEventData } from "../../utils";

@Component({
    selector: 'block-page',
    template: `
   <ng-content/>
  `,
    styleUrl: 'block-page.component.scss',
    imports: [],
    host: { class: "block-page" }

})
export class BlockPageComponent {
    currentSlide = 0;
    totalSlides = 4;
    slides = Array(this.totalSlides).fill(0);
    totalWidth = `${this.totalSlides * 100}vw`;
    window = inject(WINDOW);

    moveStart$ = new Subject<Event>();
    move$ = new Subject<Event>();
    moveEnd$ = new Subject<true>();

    @ViewChild('blocksWrapper', { static: false }) blocksWrapper!: ElementRef<HTMLElement>;


    translateX = signal<string | undefined>(undefined);

    constructor() {
        const moveStart$ = this.moveStart$.pipe(
            getEventData(),
            tap(() => {
                if (this.blocksWrapper) {
                    this.blocksWrapper.nativeElement.classList.add('no-transition');
                }
            }),
        );
        const move$ = this.move$.pipe(getEventData(), debounceTime(5), shareReplay());
        const moveEnd$ = this.moveEnd$.pipe(
            tap(() => {
                if (this.blocksWrapper) {
                    this.blocksWrapper.nativeElement.classList.remove('no-transition');
                }
            }),
        );
        this.initDragndrop(moveStart$, move$, moveEnd$);
        // this.initMove(moveStart$, move$, moveEnd$);
    }

    initMove(moveStart$: Observable<IEventData>, move$: Observable<IEventData>, moveEnd$: Observable<true>) {
        const _move$: Observable<number> = moveStart$.pipe(

            switchMap((start) => move$.pipe(

                map((end): Maybe<number> => calcMoveTranslateX(end.x - start.x, this.window.innerWidth, this.currentSlide, this.totalSlides)),
                takeUntil(moveEnd$),
            )),
            ignoreError(),
            filterUndefined(),

        );

        const moveSignal = toSignal(_move$)
        effect(() => {
            const x = moveSignal();
            // console.log('** translateX', x)
            if (x) {
                this.translateX.set(formatTranstateX(x))
            }
        });
    }

    initDragndrop(moveStart$: Observable<IEventData>, move$: Observable<IEventData>, moveEnd$: Observable<true>) {
        const dragndrop$ = moveStart$.pipe(
            switchMap((start) => moveEnd$.pipe(map(() => start))),
            withLatestFrom(move$, (start, end): [IEventData, IEventData] => [start, end]),
            log('*** [initDragndrop] moveEnd', { getDataFn: ([start, end]) => end.x - start.x }),
            map((data) => {
                let slideIndex = this.currentSlide;
                switch (this.getSwipeDirection(data)) {
                    case 'left':
                        if (this.currentSlide > 0) {
                            slideIndex--;
                        }
                        break

                    case 'right':
                        if (this.currentSlide < this.totalSlides - 1) {
                            slideIndex++;
                        }
                        break;
                }
                this.currentSlide = slideIndex

                return -slideIndex * 100;
            }),

            ignoreError(),

            filterUndefined(),

        )
        const translateXSignal = toSignal(dragndrop$)
        effect(() => {
            const x = translateXSignal();
            console.log('** translateX', x)
            if (x !== undefined) {
                this.translateX.set(formatTranstateX(x));
            }
        });
    }


    // @HostListener('window:keydown', ['$event'])
    // onKeyDown(event: KeyboardEvent) {
    //     if (event.key === 'ArrowLeft') {
    //         this.prevSlide();
    //     } else if (event.key === 'ArrowRight') {
    //         this.nextSlide();
    //     }
    // }

    private getSwipeDirection([start, end]: [IEventData, IEventData]): TSwipeDirection | undefined {
        const deltaX = end.x - start.x;
        const deltaTime = end.time - start.time;
        const velocity = Math.abs(deltaX) / deltaTime;

        const threshold = this.window.innerWidth * 0.25; // 25% экрана
        const fastSwipe = velocity > 0.5; // Быстрый свайп

        let direction: TSwipeDirection | undefined;
        if (Math.abs(deltaX) > threshold || fastSwipe) {
            direction = deltaX > 0 ? 'left' : 'right'
        }
        return direction;
    }


}