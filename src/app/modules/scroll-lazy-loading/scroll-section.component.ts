import { AfterViewInit, Component, ElementRef, inject, input, OnDestroy, OnInit, signal } from "@angular/core";
import { SCROLL_MANAGER } from "./provider";

@Component({
    selector: 'scroll-section',
    template: `
    @if(isVisible()){
        @defer  {
            <ng-content/> 
        }@placeholder {
            Тут будет компонент
        }@loading {
            компонент грузится
        }
    }

    `,
    standalone: true,
    host: { class: 'scroll-section' }
})
export class ScrollSectionComponent implements OnInit, AfterViewInit, OnDestroy {
    readonly id = input.required<string>();
    private readonly elRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
    private readonly manager = inject(SCROLL_MANAGER);
    private observer!: IntersectionObserver;

    isVisible = signal(false);

    ngOnInit() {
        this.manager.register(this);

        this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
            root: null, // Использовать viewport как область видимости
            rootMargin: '0px',
            threshold: .5 // Элемент считается видимым, если хотя бы 0% его видимы
        });
    }

    ngOnDestroy() {
        this.manager.remove(this);
        this.observer.disconnect();
    }

    scroll(top: number) {
        this.elRef.nativeElement.scrollTo({ behavior: 'smooth', top });
    }

    top() {
        return this.elRef.nativeElement.getBoundingClientRect().top;
    }

    ngAfterViewInit(): void {
        this.observer.observe(this.elRef.nativeElement);
    }



    onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.isVisible.set(true);
                console.log(`Section ${this.id()} is visible.`);
            } else {
                this.isVisible.set(false);
                console.log(`Section ${this.id()} is hidden.`);
            }
        });
    }
}