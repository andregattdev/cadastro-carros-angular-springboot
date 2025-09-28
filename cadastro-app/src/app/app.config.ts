import { meuhttpInterceptor } from './auth/http-interceptor.service';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([meuhttpInterceptor])),
    { provide: MdbModalService, useClass: MdbModalService } 
  ]
};
