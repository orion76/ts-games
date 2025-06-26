import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from "@angular/core";

@Component({
    selector: 'app-swipe-blocks',
    template: `
    <div class="container">
        <!-- [style.transform]="'translateX(' + translateX + 'vw)'" -->

      <div 
        #blocksWrapper 
        class="blocks-wrapper" 
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd($event)"
        (mousedown)="onMouseDown($event)"
        (mousemove)="onMouseMove($event)"
        (mouseup)="onMouseUp($event)"
        (mouseleave)="onMouseUp($event)"
      >
        <div class="block block1">
          <h1>Блок 1</h1>
          <p>Это первый блок. Свайпните влево, чтобы перейти ко второму блоку.</p>
        </div>
        <div class="block block2">
          <h1>Блок 2</h1>
          <p>Это второй блок. Свайпните вправо, чтобы вернуться к первому блоку.</p>
        </div>
      </div>
      
      <div class="swipe-indicator">
        @for(slide of slides; track $index){
        <button 
        class="dot"     
        [class.active]="$index === currentSlide"   
        (click)="goToSlide($index)">O</button>
        }

      </div>
    </div>
  `,
    styleUrl: 'horisontal-pages.component.scss',

})
export class SwipeBlocksComponent implements AfterViewInit, OnDestroy {
    @ViewChild('blocksWrapper', { static: false }) blocksWrapper!: ElementRef;

    currentSlide = 0;
    totalSlides = 2;
    slides = Array(this.totalSlides).fill(0);
    translateX = 0;

    private startX = 0;
    private currentX = 0;
    private isDragging = false;
    private startTime = 0;
    private animationId: number | null = null;

    ngAfterViewInit() {
        this.updateTransform();
    }

    ngOnDestroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
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

    onTouchStart(event: TouchEvent) {
        this.startTouch(event.touches[0].clientX);
    }

    onTouchMove(event: TouchEvent) {
        event.preventDefault();
        this.moveTouch(event.touches[0].clientX);
    }

    onTouchEnd(event: TouchEvent) {
        this.endTouch();
    }

    onMouseDown(event: MouseEvent) {
        event.preventDefault();
        this.startTouch(event.clientX);
    }

    onMouseMove(event: MouseEvent) {
        if (this.isDragging) {
            event.preventDefault();
            this.moveTouch(event.clientX);
        }
    }

    onMouseUp(event: MouseEvent) {
        this.endTouch();
    }

    private startTouch(clientX: number) {
        this.startX = clientX;
        this.currentX = clientX;
        this.isDragging = true;
        this.startTime = Date.now();

        // Убираем transition для плавного перетаскивания
        if (this.blocksWrapper) {
            this.blocksWrapper.nativeElement.classList.add('no-transition');
        }
    }

    private moveTouch(clientX: number) {
        if (!this.isDragging) return;

        this.currentX = clientX;
        const deltaX = this.currentX - this.startX;
        const currentTranslate = -this.currentSlide * 100;
        const newTranslate = currentTranslate + (deltaX / window.innerWidth * 100);

        // Ограничиваем перетаскивание
        const maxTranslate = 0;
        const minTranslate = -(this.totalSlides - 1) * 100;
        this.translateX = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
    }

    private endTouch() {
        if (!this.isDragging) return;

        this.isDragging = false;

        // Возвращаем transition
        if (this.blocksWrapper) {
            this.blocksWrapper.nativeElement.classList.remove('no-transition');
        }

        const deltaX = this.currentX - this.startX;
        const deltaTime = Date.now() - this.startTime;
        const velocity = Math.abs(deltaX) / deltaTime;

        // Определяем, нужно ли переключить слайд
        const threshold = window.innerWidth * 0.25; // 25% экрана
        const fastSwipe = velocity > 0.5; // Быстрый свайп

        if (Math.abs(deltaX) > threshold || fastSwipe) {
            if (deltaX > 0) {
                // Свайп вправо
                this.prevSlide();
            } else {
                // Свайп влево
                this.nextSlide();
            }
        } else {
            // Возвращаем к текущему слайду
            this.goToSlide(this.currentSlide);
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideIndex: number) {
        this.currentSlide = Math.max(0, Math.min(this.totalSlides - 1, slideIndex));
        this.updateTransform();
    }

    private updateTransform() {
        this.translateX = -this.currentSlide * 100;
    }
}