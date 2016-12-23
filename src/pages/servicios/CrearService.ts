import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as url from "../servicios/URL";

@Injectable()
export class CrearService {

      serverUrl;
      params;
    constructor(public http: Http) {
        this.http = http
         this.serverUrl = url.url
        
         


    }

    crearContacto(nombre,domicilio,telefono,correo) {
        this.params= 'contacto/crearContacto?nombre='+nombre+'&domicilio='+domicilio+'&telefono='+telefono+'&correo='+correo
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }
}
