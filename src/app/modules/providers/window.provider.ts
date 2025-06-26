import { InjectionToken, Provider } from "@angular/core";

export const WINDOW = new InjectionToken<Window & typeof globalThis>('WINDOW', {
  factory: () => {
    return window;
  }
})

export function provideWindow(): Provider {
  return { provide: WINDOW, useValue: window }
}