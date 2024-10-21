import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { MessageService } from '../messages/messages.services';

export const appConfig: ApplicationConfig = {
  //providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: MessageService }
  ]
};
