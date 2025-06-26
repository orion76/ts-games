import { Directive, inject, InjectFlags } from "@angular/core";

import { ScrollLazyLoadingException } from "./scroll-lazy-loading.exception";
import { ScrollSectionComponent } from "./scroll-section.component";

import { WINDOW } from "../providers/window.provider";
import { provideScrollManager, SCROLL_MANAGER } from "./provider";



@Directive({
    selector: '[scrollContainer]',
    providers: [provideScrollManager()],
    standalone: true
})
export class ScrollContainerDirective {
    private manager = inject(SCROLL_MANAGER, { self: true });
    scroll(id: string) {
        this.manager.scroll(id);
    }
}