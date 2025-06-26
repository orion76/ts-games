import { inject, Injectable } from "@angular/core";
import { WINDOW } from "../providers/window.provider";
import { ScrollLazyLoadingException } from "./scroll-lazy-loading.exception";
import { ScrollSectionComponent } from "./scroll-section.component";
import { IScrollManager } from "./types";




@Injectable()
export class ScrollManager implements IScrollManager {
    private sections = new Map<string, ScrollSectionComponent>();
    private window = inject(WINDOW);
    scroll(id: string) {
        const section = this.sections.get(id);
        if (!section) {
            throw new ScrollLazyLoadingException(`Scroll section with id: ${id} not found.`);
        }
        const top = section.top() + this.window.pageYOffset;
        this.window.scrollTo({ top, behavior: 'smooth' })
    }

    register(section: ScrollSectionComponent) {
        const id = section.id();
        if (this.sections.has(id)) {
            throw new ScrollLazyLoadingException(`Scroll section with id: ${id} already registered.`);
        }
        this.sections.set(id, section);
    }

    remove(section: ScrollSectionComponent) {
        const id = section.id();
        if (!this.sections.has(id)) {
            throw new ScrollLazyLoadingException(`Scroll section with id: ${id} cannot be deleted. She was not found.`);
        }
        this.sections.delete(id);
    }
}