import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { loginPage } from '../pages/login/login';
import { inicioPage } from '../pages/inicio/inicio';
import { novedadesPage } from '../pages/novedades/novedades';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    loginPage,
    inicioPage,
    novedadesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    loginPage,
    inicioPage,
    novedadesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
