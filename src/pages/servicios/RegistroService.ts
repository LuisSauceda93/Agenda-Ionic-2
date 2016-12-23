import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as url from "../services/URL";


@Injectable()
export class RegistroService {
      serverUrl;
      params;
    constructor(public http: Http) {
        this.http = http
        this.serverUrl = url.url
        

    }

    regUser(userNombre,userCorreo,userName,userPass,tipoUser) {
        this.params= 'ums/registrarUsuario?usuario={nombre:'+userNombre+', correo :'+userCorreo+', username :'+userName+', imagenPerfil:"http://i2.wp.com/www.clinicatorielli.com/img/icons/no-user.png", password:'+userPass+',roles:[{idRol:2}]}&tipoUsuario='+tipoUser;
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());

    }
    recuperarPass(username,tipoUser){
       this.params= 'ums/recuperarPassword?username='+username+'&tipoUser='+tipoUser
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json()); 
    }
}
