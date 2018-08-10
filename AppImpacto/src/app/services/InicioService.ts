import { Injectable, Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../AppSettings';

import 'rxjs/add/operator/map';

@Injectable()
export class InicioService {
  constructor(
    private http: Http
  ) {

  }
  getInicio(instId, rolId) {
    let url = AppSettings.API_ENDPOINT + 'Inicio';
    let dataGet = { InstId: instId, RolId: rolId, UsuId: 0, Tipo: '1' };

    let data = this.http.post(url, dataGet, {
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    return data;
  }
  getMuro(instId, usuId) {
    let url = AppSettings.API_ENDPOINT + 'Muro';
    let dataGet = { InstId: instId, UsuId: usuId };

    let data = this.http.post(url, dataGet, {
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    return data;
  }

}
