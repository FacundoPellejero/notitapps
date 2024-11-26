import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

//Esto reemplaza el import de browserAnimationsModule en Angular 18
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations()] 
};
