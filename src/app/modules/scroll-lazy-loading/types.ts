import { ScrollSectionComponent } from "./scroll-section.component";

export interface IScrollManager {
    scroll(id: string): void;
    register(section: ScrollSectionComponent): void;
    remove(section: ScrollSectionComponent): void;
}