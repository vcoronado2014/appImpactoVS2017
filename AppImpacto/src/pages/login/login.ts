import { Component } from '@angular/core';
import { NavController, NavParams, Toast } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../app/services/AuthService';
import { HomePage } from "../home/home";
import { inicioPage } from '../inicio/inicio';

/*
  Generated class for the login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [AuthService]
})
export class loginPage {
  usuario: string;
  password: string;
  isLogged: boolean;

  constructor(public nav: NavController, private auth: AuthService, public navParams: NavParams, public toastCtrl: ToastController) {

  }

  presentToast = function (mensaje, posicion, duracion) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: posicion
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  Signup() {
    //validaciones
    if (!this.usuario) {
      let mi = this.presentToast('Nombre de usuario requerido', 'bottom', 4000);
      return;
    }
    if (!this.password) {
      let mi = this.presentToast('Password requerida', 'bottom', 4000);
      return;
    }
    let f = { usuario: this.usuario, password: this.password };
    this.auth.login(f)
      .subscribe(
      rs => this.isLogged = rs,
      er => {
        //console.log(error)
        let mi = this.presentToast('Usuario no exite', 'bottom', 4000);

      },
      () => {
        if (this.isLogged) {
          this.nav.setRoot(inicioPage)
            .then(data => console.log(data),
            error => {
              //console.log(error)
              let mi = this.presentToast(error, 'bottom', 4000);
            }
            );
        } else {
          //incorrecto
          console.log('Acceso denegado');
          let mi = this.presentToast('Usuario no exite', 'bottom', 4000);
        }

      }
      )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad loginPage');
  }

}
