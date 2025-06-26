import { InjectionToken, Provider } from "@angular/core";
import { IScrollManager } from "./types";
import { ScrollManager } from "./scroll-manager.service";

export const SCROLL_MANAGER = new InjectionToken<IScrollManager>('SCROLL_MANAGER');
export function provideScrollManager(): Provider {
    return { provide: SCROLL_MANAGER, useClass: ScrollManager }
}