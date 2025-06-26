import { ApplicationConfig, InjectionToken, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MODAL_WINDOW_SERVICE, ModalWindowService } from './modules/modal-window/modal-window.service';
import { provideWindow } from './modules/providers/window.provider';


export const appConfig: ApplicationConfig = {
  providers: [
    provideWindow(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // withDebugTracing()
    ),
    { provide: MODAL_WINDOW_SERVICE, useClass: ModalWindowService },
  ]
};
