import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as url from "../services/URL";
@Injectable() 
export class SolicitudService {
      serverUrl;
      serverUrl2;
      params;
      
    constructor(public http: Http) {
        this.http = http
         this.serverUrl = url.url
         this.serverUrl2 = url.url_fecha
        

    }

    crearSolicitud(precio,userId,tramo) {
        var url2 = 'sms/crearSolicitud?solicitud=';

        this.params={precioFlete:precio,idCliente:userId,tareas:tramo};
        var ht = JSON.stringify(this.params);
        var url = this.serverUrl+ url2 + ht;
       
         
        

        return this.http.get(url).map(res => res.json());
       
    }
       crearSolicitudAdmin(precio,userId,transporteId,operadorId,tramo) {
        var url2 = 'sms/crearSolicitud?solicitud=';

        this.params={precioFlete:precio,idCliente:userId,idTransporte:transporteId,idOperador:operadorId,tareas:tramo};
        var ht = JSON.stringify(this.params);
        var url = this.serverUrl+ url2 + ht;
       
         
        

        return this.http.get(url).map(res => res.json());
       
    }
     mostrarSolicitud(userId) {
        this.params= 'Catalog/listarSolicitudes?idCliente='+userId
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }
    
    listaTransporte(){
           this.params='Catalog/listarTransportes'
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }
    
       listaOperador(){
           this.params='Catalog/listarUsuarios?tipoUsuario=3'
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }
     listaCliente(){
           this.params='Catalog/listarUsuarios?tipoUsuario=2'
        var url = this.serverUrl+ this.params;
        return this.http.get(url).map(res => res.json());
    }

     listaEquipos(familia,marca){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'Catalog/listarEquipos?idFamilia='+familia+'&idMarca='+marca
        var url = this.serverUrl+this.params;
        return this.http.get(url).map(res => res.json());
    }
    listaFamilias(){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'Catalog/listarFamilias'
        var url = this.serverUrl+this.params;
        return this.http.get(url).map(res => res.json());
    }
     listaMarcas(){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'Catalog/listarMarcas'
        var url = this.serverUrl+this.params;
        return this.http.get(url).map(res => res.json());
    }
       crearEquipos(descripcion,modelo,noSerie,marca,peso,alto,ancho,largo,idMarca,idFamilia){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'ems/crearEquipoNuevo?equipo={descripcion:'+descripcion+',modelo:'+modelo+',noSerie:'+noSerie+',marca:'+marca+',peso:'+peso+',alto:'+alto+',ancho:'+ancho+',largo:'+largo+',idMarca:'+idMarca+',idFamilia:'+idFamilia+',imagenesEquipo:[]}'
        var url = this.serverUrl+this.params;
        return this.http.get(url).map(res => res.json());
    }

    editarFH(idTramo,fechaE,horaE){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'sms/modificarFechasRecoleccion/'+idTramo+'/'+fechaE+'/'+horaE+''
        var url = this.serverUrl+this.params;
        let body = ''
        return this.http.put(url,body).map(res => res.json());
    }

    ubicacion(tramo){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'edo/traerUbicacion?idSolicitud='+tramo
        var url = this.serverUrl+this.params;
        return this.http.get(url).map(res => res.json());
    }

     incidencias(tramo){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'incidencias/listarIncidencias?idTramo='+tramo
        var url = this.serverUrl+this.params;
        return this.http.get(url).map(res => res.json());
    }

     asignarOT(idSolicitud,operador,transporte){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'sms/asignarRecursos/'+idSolicitud+'/'+operador+'/'+transporte+''
        var url = this.serverUrl+this.params;
        let body = ''
        return this.http.put(url,body).map(res => res.json());
    }

 buscarCliente(nombre){
       // this.params= 'ums/login?usuario={username:'+userName+',password:'+userPass+'}&tipoUsuario='+tipoUser
        this.params = 'Catalog/buscarElemento?tipoElemento=CLIENTE&filtro='+nombre
        var url = this.serverUrl+this.params;
        return this.http.get(url).map(res => res.json());
    }
    

}

