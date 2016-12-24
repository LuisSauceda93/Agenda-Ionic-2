import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { ListarService } from '../servicios/ListarService';
import { EliminarService } from '../servicios/EliminarService';
import { HomePage } from '../home/home';
import * as lista from "../home/home";
import {CallNumber} from 'ionic-native';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[ListarService,EliminarService]
})
export class ContactPage {

listarService
eliminarService
contactos=[]
contactoCatalogo=[]
searchQuery: string = '';

  constructor(public navCtrl: NavController,
              listarService:ListarService,
              eliminarService:EliminarService,
              public alertCrtl:AlertController) {

      this.listarService=listarService
      this.eliminarService=eliminarService
      this.listaContactos()
     


  }

  doRefresh(refresher){

this.listarService.mostrarContactos().subscribe(
       data => {
  
         this.contactos = data.results;
          this.contactoCatalogo= this.contactos;
         
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

  getItems(ev: any) {
    // Reset items back to all of the items
    this.contactos= this.contactoCatalogo
    
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.contactos = this.contactos.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


itemTapped(event,item){

console.log(item.nombre)
CallNumber.callNumber(item.telefono, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));

}

itemTappedEliminar(event,item,index){

console.log('Index: '+index);
this.contactos.splice(index,1);

console.log(item.idContacto)

this.eliminarService.eliminarContacto(item.idContacto).subscribe(
          data => {
              
              console.log(data.results);
      
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


  listaContactos(){

    this.listarService.mostrarContactos().subscribe(
          data => {
              
              console.log(data.results);
             this.contactos = data.results;
             this.contactoCatalogo= this.contactos;
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
