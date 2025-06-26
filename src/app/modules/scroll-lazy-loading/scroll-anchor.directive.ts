import { Directive, Input, HostListener, input, inject } from "@angular/core";
import { SCROLL_MANAGER } from "./provider";



@Directive({
    selector: '[scrollAnchor]',
})
export class ScrollAnchorDirective {
    id = input.required<string>({ alias: 'scrollAnchor' });
    manager = inject(SCROLL_MANAGER);

    @HostListener('click') scroll() {
        this.manager.scroll(this.id());
    }
}