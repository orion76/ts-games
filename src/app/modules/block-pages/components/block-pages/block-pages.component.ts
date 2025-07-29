import { AfterViewInit, Component, ContentChildren, effect, ElementRef, HostListener, inject, InjectionToken, input, numberAttribute, QueryList, signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, finalize, map, Subject, switchMap, takeUntil, throttleTime } from 'rxjs';
import { filterUndefined } from '../../../utils/rxjs-operators';
import { IEventData, IStartEventData, ISwipeData, TSwipeDirection } from '../../types';
import { formatTranstateX, getEventData, getStartEventData, isEventWithTarget } from '../../utils';
import { BlockPageComponent } from '../block-page/block-page.component';
import { BlockPagesMenuComponent } from '../menu/block-pages-menu.component';
import { IMenuConfig } from './types';

export const BLOCK_PAGE_WIDTH = new InjectionToken<number>('BLOCK_PAGE_WIDTH');

@Component({
    selector: 'block-pages',
    template: `
        @if (menuConfig()?.items) {
            <block-pages-menu [items]="menuConfig()?.items" />
        }
        <div
            #blocksWrapper
            class="blocks-wrapper"
            [style.transform]="sTranslateX()"
            (mousedown)="moveStart$.next($event)"
            (mousemove)="move$.next($event)"
            (mouseup)="moveEnd$.next(true)"
            (mouseleave)="moveEnd$.next(true)"
            (touchstart)="moveStart$.next($event)"
            (touchmove)="move$.next($event)"
            (touchend)="moveEnd$.next(true)">
            <ng-content select="block-page" />
        </div>
    `,
    styleUrl: 'block-pages.component.scss',
    imports: [BlockPagesMenuComponent],

    providers: [
        {
            provide: BLOCK_PAGE_WIDTH,
            useFactory: (component: BlockPagesComponent) => component.elementWidth,
            deps: [BlockPagesComponent],
        },
    ],
})
export class BlockPagesComponent implements AfterViewInit {
    menuConfig = input<IMenuConfig | undefined>();

    currentSlideIndex = 0;
    slidesCount!: number;
    containerWidth!: number;
    containerOffset!: number;
    maxAvailableOffset!: number;
    swipaData: ISwipeData = { offset: 0, time: 0 };

    readonly viewWidth = input(undefined, { transform: numberAttribute });
    elementRef = inject(ElementRef<HTMLElement>);
    elementWidth: number;

    moveStart$ = new Subject<Event>();
    move$ = new Subject<Event>();
    moveEnd$ = new Subject<Boolean>();

    sTranslateX = signal<string | undefined>(undefined);

    @ViewChild('blocksWrapper', { static: false }) blocksWrapper!: ElementRef<HTMLElement>;
    @ContentChildren(BlockPageComponent) pages!: QueryList<BlockPageComponent>;

    constructor() {
        const el: HTMLElement = this.elementRef.nativeElement;
        this.elementWidth = this.viewWidth() || el.clientWidth;
        this.containerOffset = el.getBoundingClientRect().left;
        this.initSwipe();
    }

    ngAfterViewInit() {
        this.slidesCount = this.pages.length;
        this.containerWidth = this.elementWidth * this.slidesCount;

        this.maxAvailableOffset = this.containerWidth - this.elementWidth;
    }
    initSwipe() {
        const eventMoveStart$ = this.moveStart$.pipe(filter(isEventWithTarget), getStartEventData(this.containerOffset));

        const eventMove$ = this.move$.pipe(
            throttleTime(50),
            getEventData(),
            distinctUntilChanged((a, b) => a.x === b.x),
        );

        const moveTo$ = eventMoveStart$.pipe(
            switchMap(start =>
                eventMove$.pipe(
                    map(end => {
                        this.updateSwipaData(start, end);
                        return this.calculateXMove(start, end);
                    }),
                    filterUndefined(),
                    takeUntil(this.moveEnd$),
                    finalize(() => {
                        this.updateCurrentIndex();
                        this.sTranslateX.set(formatTranstateX(-this.currentSlideIndex * this.elementWidth));
                    }),
                ),
            ),
        );
        const sSwipe = toSignal(moveTo$);
        effect(() => {
            const swipe = sSwipe();
            if (swipe !== undefined) {
                this.sTranslateX.set(formatTranstateX(swipe));
            }
        });
    }

    calculateXMove(start: IStartEventData, end: IEventData): number | undefined {
        const { maxAvailableOffset } = this;
        const diff = end.x - start.x;
        if (diff === 0) {
            return;
        }
        const targetX = start.elOffset + diff;

        return diff > 0 ? Math.min(targetX, 0) : Math.max(targetX, -maxAvailableOffset);
    }

    updateSwipaData(start: IEventData, end: IEventData) {
        const offset = end.x - start.x;
        const time = end.time - start.time;
        this.swipaData = { offset, time };
    }

    updateCurrentIndex(): void {
        const { slidesCount } = this;

        switch (this.getSwipeDirection()) {
            case 'left':
                if (this.currentSlideIndex > 0) {
                    this.currentSlideIndex--;
                }
                break;
            case 'right':
                if (this.currentSlideIndex < slidesCount - 1) {
                    this.currentSlideIndex++;
                }
                break;
        }
    }

    private getSwipeDirection(): TSwipeDirection | undefined {
        const offset = this.swipaData.offset;
        const time = this.swipaData.time;

        const velocity = Math.abs(offset) / time;

        const threshold = this.elementWidth * 0.25; // 25% экрана
        const fastSwipe = velocity > 0.5; // Быстрый свайп

        let direction: TSwipeDirection | undefined;
        if (Math.abs(offset) > threshold || fastSwipe) {
            direction = offset > 0 ? 'left' : 'right';
        }
        return direction;
    }

    prevSlide() {
        if (this.currentSlideIndex < this.slidesCount) {
            this.currentSlideIndex++;
            this.sTranslateX.set(formatTranstateX(-this.currentSlideIndex * this.elementWidth));
        }
    }

    nextSlide() {
        if (this.currentSlideIndex > 0) {
            this.currentSlideIndex--;
            this.sTranslateX.set(formatTranstateX(-this.currentSlideIndex * this.elementWidth));
        }
    }
    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.prevSlide();
        } else if (event.key === 'ArrowRight') {
            this.nextSlide();
        }
    }
}
