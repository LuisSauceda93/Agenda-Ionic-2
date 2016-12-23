import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { ListarService } from '../servicios/ListarService';
import { HomePage } from '../home/home';
import * as lista from "../home/home";
import {CallNumber} from 'ionic-native';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[ListarService]
})
export class ContactPage {

listarService
contactos=[]
solicitudesCatalogo=[]

  constructor(public navCtrl: NavController,
              listarService:ListarService,
              public alertCrtl:AlertController) {

      this.listarService=listarService
      this.listaContactos()
      this.contactos=lista.lista;

  }

  doRefresh(refresher){

this.listarService.mostrarContactos().subscribe(
       data => {

         this.contactos = data.results;
         
 if(data.results.length === 0){
          let alert = this.alertCrtl.create({
      title: 'Atención!',
      subTitle: 'No existen solicitudes disponibles',
      buttons: ['Aceptar']
    });
    alert.present();
        }
          console.log(data.results);
        },
       err => 
       console.log(err),
       
       () =>  refresher.complete()
       );



 }

  getItems(searchbar) {
    // Reset items back to all of the items
  //this.cargaEquipos(); 
  
  this.contactos = this.solicitudesCatalogo;

  var q = searchbar.target.value;
  //console.log(q);
 if (q && q.trim() == '') {
      return;
    }

    this.contactos = this.contactos.filter((v) => {
      if (v.nombre.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }


  listaContactos(){

    this.listarService.mostrarContactos().subscribe(
          data => {
              
              console.log(data.results);
             this.contactos = data.results;

                },
          err =>{
              console.log(err);
              //this.loading.dismiss();
              let alert = this.alertCrtl.create({
                title: "Error de conexión",
                subTitle:"Ocurrio un problema para realizar la operación, intenta nuevamente<br><small>codigo: "+err.status+"</small>",
                buttons: [ 'Aceptar']
            });
             alert.present();
          }
          //() => console.log('Verificacion completa')
         );
  }

  nuevoContacto(){
    this.navCtrl.push(HomePage);
  }

}
