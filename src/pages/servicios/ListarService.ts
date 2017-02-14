import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as url from "../servicios/URL";

@Injectable() 
export class ListarService {
      serverUrl;
      params;
    
    constructor(public http: Http) {
        this.http = http
        this.serverUrl = url.url

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

}
