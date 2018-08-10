import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public navCtrl: NavController,
    public navigation: Nav,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: Splashscreen) {

    var paginaUno = { title: 'Inicio', component: HomePage, visible: true, icon: 'home' };
    /*
    var paginaDos = {title: 'Ajustes', component: AjustesPage, visible: true, icon: 'construct'};
    var paginaTres = {title: 'Acerca de',component: AyudaPage, visible: true, icon: 'warning'};
    var paginaCuatro = {title: 'Antecedentes', component: AntecedentesPage, visible: true, icon: 'list-box'};
    var paginaCinco = {title: 'Calendario', component: CalendarioPage, segment:'calendario/:this.usuarioAps', visible: true, icon: 'calendar'};
    var paginaSeis = {title: 'Familia', component: FamiliaPage, visible: true, icon: 'people'};
    var paginaSiete = {title:'Detalle-usuario', component: DetailUsuarioPage, defaultHistory: [AntecedentesPage], visible:true, icon:'contact'};
    var paginaOcho = {title:'Detalle-citas', component: DetailCitasPage, defaultHistory: [CalendarioPage], visible:true, icon:'create'};
    var paginaNueve = {title:'Ordenes', component: OrdenesPage, visible:true, icon:'create'};
    */

    this.pages = [paginaUno];



  }
  openPage(pages) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(pages.component);
  }

}
