import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { loginPage } from '../login/login';
import { novedadesPage } from '../novedades/novedades';

import { AuthService } from '../../app/services/AuthService';
import { InicioService } from '../../app/services/InicioService';

/*
  Generated class for the inicio page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-inicio',
    templateUrl: 'inicio.html',
    providers: [AuthService, InicioService]
})
export class inicioPage {
  dataGeneral: any;
  eventos: any;
  proyectos: any;
  votaciones: any;
  usuarios: any;
  establecimientos: any;
  rendiciones: any;
  documentos: any;
  tarjetas: any;
  solicitudes: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public acceso: AuthService,
    public ini: InicioService) {

    //seteamos las variables
    this.dataGeneral = [];
    this.eventos = [];
    this.proyectos = [];
    this.votaciones = [];
    this.usuarios = [];
    this.establecimientos = [];
    this.rendiciones = [];
    this.documentos = [];
    this.solicitudes = [];

    //para mostrar en la pagina de inicio
    this.tarjetas = [];

    let loader = this.loading.create({
      content: 'Cargando Inicio...',
    });

    loader.present().then(() => {
      //llamadas de negocio
      var instId = sessionStorage.getItem("INST_ID");
      var rolId = sessionStorage.getItem("ROL_ID");
      var usuId = sessionStorage.getItem("USU_ID");
      this.ini.getInicio(instId, rolId).subscribe(
        data => {
          //acá debemos construir los objetos de persistencia

          this.dataGeneral = data.json();
          if (this.dataGeneral) {
            if (this.dataGeneral.Eventos) {
              this.eventos = this.dataGeneral.Eventos;
            }
            /*
            if (this.dataGeneral.Proyectos){
              this.proyectos = this.dataGeneral.Proyectos;
            }
            if (this.dataGeneral.Votaciones.proposals){
              this.votaciones = this.dataGeneral.Votaciones.proposals;
            }
            */
            if (this.dataGeneral.Usuarios) {
              this.usuarios = this.dataGeneral.Usuarios;
            }
            if (this.dataGeneral.Establecimientos.proposals) {
              this.establecimientos = this.dataGeneral.Establecimientos.proposals;
            }
            if (this.dataGeneral.Rendiciones.proposals) {
              this.rendiciones = this.dataGeneral.Rendiciones.proposals;
            }
            if (this.dataGeneral.Documentos.proposals) {
              this.documentos = this.dataGeneral.Documentos.proposals;
            }
            //ahora armamos las tarjetas
            //eventos
            if (this.eventos.length > 0) {
              var entidad = {
                Titulo: 'Eventos',
                Texto: 'Existen ' + this.eventos.length + ' eventos.',
                IconoGeneral: 'calendar',
                IconoBoton: 'arrow-forward'
              };
              this.tarjetas.push(entidad);

            }
            /*
            //Proyectos
            if (this.proyectos.length > 0){
              var entidad = {
                Titulo: 'Proyectos',
                Texto: 'Existen ' + this.proyectos.length + ' proyectos.',
                IconoGeneral: 'briefcase',
                IconoBoton: 'arrow-forward'
              };
              this.tarjetas.push(entidad);

            }
            //votaciones tricel
            if (this.votaciones.length > 0){
              var entidad = {
                Titulo: 'Tricel',
                Texto: 'Existen ' + this.votaciones.length + ' triceles creados.',
                IconoGeneral: 'hammer',
                IconoBoton: 'arrow-forward'
              };
              this.tarjetas.push(entidad);

            }
            */
            //rendiciones
            if (this.rendiciones.length > 0) {
              var entidad = {
                Titulo: 'Rendiciones',
                Texto: 'Existen ' + this.rendiciones.length + ' rendiciones.',
                IconoGeneral: 'stats',
                IconoBoton: 'arrow-forward'
              };
              this.tarjetas.push(entidad);

            }
            //documentos
            if (this.documentos.length > 0) {
              var entidad = {
                Titulo: 'Documentos',
                Texto: 'Existen ' + this.documentos.length + ' documentos.',
                IconoGeneral: 'document',
                IconoBoton: 'arrow-forward'
              };
              this.tarjetas.push(entidad);

            }

          }
          //carga de los novedades
          let loaderComen = this.loading.create({
            content: 'Cargando Novedades...',
          });

          loaderComen.present().then(() => {
            this.ini.getMuro(instId, usuId).subscribe(
              dataMuro => {

                //elementos del muro
                this.solicitudes = dataMuro.json();
                if (this.solicitudes.length > 0) {
                  var entidad = {
                    Titulo: 'Novedades',
                    Texto: 'Existen ' + this.solicitudes.length + ' novedades.',
                    IconoGeneral: 'chatboxes',
                    IconoBoton: 'arrow-forward'
                  };
                  this.tarjetas.push(entidad);

                }

              },
              err => {
                console.error(err);
                loaderComen.dismiss();
              },
              () => {
                console.log('get comment completed');
                //terminamos;
                loaderComen.dismiss();
              }

            );

          });
        },
        err => {
          console.error(err);
          loader.dismiss();
        },
        () => {
          console.log('get inicio completed');
          //terminamos;
          loader.dismiss();
        }
      );


    });
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad inicioPage');
    }
    logout() {
      this.acceso.logout();
      this.navCtrl.setRoot(loginPage);
    }
    openPage(nombre) {

      switch (nombre.Titulo) {
        case 'Eventos':
          alert('eventos');
          break;
        case 'Proyectos':
          alert('proyectos');
          break;
        case 'Tricel':
          alert('tricel');
          break;
        case 'Rendiciones':
          alert('rendicion');
          break;
        case 'Documentos':
          alert('documentos');
          break;
        case 'Novedades':
          //alert('documentos');
          //this.navCtrl.push(NovedadesPage, {id: id});
          this.navCtrl.setRoot(novedadesPage);
          break;
      }
    }

}
