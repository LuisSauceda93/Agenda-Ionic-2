import { Component } from '@angular/core';
import * as call from "../contact/contact";
import { NavController, AlertController, ToastController } from 'ionic-angular';
import {CallNumber} from 'ionic-native';
import { ListarService } from '../servicios/ListarService';
import { CrearService } from '../servicios/CrearService';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers:[ListarService]
})
export class AboutPage {

  llamadas = []
  Catalogollamadas = [];
  listarService
  crearService

  constructor(public navCtrl: NavController,
              public alertCrtl:AlertController,
              listarService:ListarService,
              crearService:CrearService,
              public toastCtrl: ToastController) {

    this.llamadas = call.llamada
    this.listarService=listarService
    this.crearService=crearService

  }

  
itemTapped(event,item){

console.log(item.nombre)
CallNumber.callNumber(item.telefono, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));

  this.crearService.crearLlamada(item.telefono,item.nombre).subscribe(
          data => {
              
              console.log(data.results);

    

      if(data.results.estatus == "OK"){
        console.log('Llamada registrada');
        this.listaLlamada();
        
      }
                },
          err =>{
              console.log(err);
              //this.loading.dismiss();
                 let toast = this.toastCtrl.create({
    message: "Ocurrio un problema para realizar la operación, intenta nuevamente<br><small>codigo: "+err.status+"</small>",
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
            
          }
          //() => console.log('Verificacion completa')
         );

}

  doRefresh(refresher){

this.listarService.mostrarLlamada().subscribe(
       data => {
  
         this.llamadas = data.results;
          this.Catalogollamadas= this.llamadas;
         
 if(data.results.length === 0){
          let alert = this.alertCrtl.create({
      title: 'Atención!',
      subTitle: 'No existen registro de llamadas',
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


 listaLlamada(){

    this.listarService.mostrarLlamada().subscribe(
          data => {
              
              console.log(data.results);
             this.llamadas = data.results;
             this.Catalogollamadas= this.llamadas;
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

  

}
