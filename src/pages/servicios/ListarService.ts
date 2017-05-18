import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as url from "../servicios/URL";

@Injectable() 
export class ListarService {
      serverUrl;
      params;
      url_estados
    constructor(public http: Http) {
        this.http = http
        this.serverUrl = url.url
        this.url_estados =url.url +"contacto/crearMascota"

    }

    mostrarContactos() {
        this.params= 'contacto/listarContacto'
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }

      mostrarContactosNombre(nombre) {
        this.params= 'contacto/listarContacto?nombre='+nombre
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }

     mostrarLlamadaNombre(nombre) {
        this.params= 'contacto/listarLlamada?nombre='+nombre
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }
     mostrarLlamada() {
        this.params= 'contacto/listarLlamada'
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }
    estados() {



            let body ={
  "nombre":"Tomas",
  "sexo": "Macho",
  "fechaNac": "2014-02-18",
  "raza": "Swancherz",
  "color": "Negro",
  "notas": "Burro",
  "foto": null,
  "edad": "4",
  "idUsuario": 1
};
//console.log(body);


        let bodyJ = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url_estados, bodyJ, options).map(res => res.json());



    }

}
