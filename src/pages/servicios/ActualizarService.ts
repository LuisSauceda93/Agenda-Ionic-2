import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as url from "../services/URL";

@Injectable() 
export class ActualizarService {
      serverUrl;
      params;
    constructor(public http: Http) {
        this.http = http

          this.serverUrl = url.url
          
          

    }

    actualizarDatos(Id,numUsuario,nombre,correo,username,pass,imagenPerfil,rfc,calle,numE,numI,colonia,cp,telefono,ciudad,estado,pais,coor,raking,estatus) {
        this.params= 'ums/actualizarRegistro?objeto={idCliente:'+Id+',numUsuario:'+numUsuario+',nombre:'+nombre+',correo:'+correo+',username:'+username+',password:'+pass+',imagenPerfil:'+imagenPerfil+',rfc:'+rfc+',calle:'+calle+',noExt:'+numE+',noInt:'+numI+',colonia:'+colonia+',cp:'+cp+',telefono:'+telefono+',ciudad:'+ciudad+',estado:'+estado+',pais:'+pais+',coordenadas:'+coor+',raking:'+raking+',estatus:'+estatus+'}&tipoObjeto=2'
        var url = this.serverUrl+ this.params;
        console.log(url);
        
        return this.http.get(url).map(res => res.json());
    }

    actualizarPass(id,password,tipo){
        this.params= '/ums/actualizarPassword?user='+id+'&password='+password+'&tipoUser='+tipo;
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }
    avatar(id,tipoUser,imageURL){
        this.params= 'ums/cambiarImagenPerfil/'+id+'/'+tipoUser+'?url='+imageURL
        var url = this.serverUrl+ this.params;
        let body = ""
        return this.http.put(url,body).map(res => res.json());
    }
     
     doUserAuth(userName,userPass,tipoUser) {
        this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }

}
