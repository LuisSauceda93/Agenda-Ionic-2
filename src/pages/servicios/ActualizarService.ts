import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as url from "../servicios/URL";

@Injectable() 
export class ActualizarService {
      serverUrl;
      params;
    constructor(public http: Http) {
        this.http = http

          this.serverUrl = url.url
          
          

    }

    actualizarContacto(Id,nombre,domicilio,telefono,correo) {
        this.params= 'contacto/editarContacto?idContacto='+Id+'&nombre='+nombre+'&domicilio='+domicilio+'&telefono='+telefono+'&correo='+correo
        var url = this.serverUrl+ this.params;
        console.log(url);
        
        return this.http.get(url).map(res => res.json());
    }

  

}
