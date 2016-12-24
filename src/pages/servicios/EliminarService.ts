import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as url from "../servicios/URL";


@Injectable()
export class EliminarService {
      serverUrl;
      params;
    constructor(public http: Http) {
        this.http = http
        this.serverUrl = url.url
        

    }

   
    eliminarContacto(idContacto){
       this.params= 'contacto/eliminarContacto?idContacto='+idContacto
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json()); 
    }
}
