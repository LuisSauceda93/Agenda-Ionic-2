import { Component } from '@angular/core';
import * as call from "../contact/contact";
import { NavController, AlertController, ToastController } from 'ionic-angular';
import {CallNumber} from 'ionic-native';
import { ListarService } from '../servicios/ListarService';
import { EliminarService } from '../servicios/EliminarService';
import { CrearService } from '../servicios/CrearService';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers:[ListarService,EliminarService]
})
export class AboutPage {

  llamadas = []
  Catalogollamadas = [];
  listarService
  crearService
  eliminarService
  searchQuery: string = '';

  constructor(public navCtrl: NavController,
              public alertCrtl:AlertController,
              listarService:ListarService,
              crearService:CrearService,
               eliminarService:EliminarService,
              public toastCtrl: ToastController) {

    this.llamadas = call.llamada
    this.listarService=listarService
    this.crearService=crearService
    this.eliminarService=eliminarService

  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.llamadas= this.Catalogollamadas
    
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.llamadas = this.llamadas.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
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


itemTappedEliminar(event,item,index){

console.log('Index: '+index);
this.llamadas.splice(index,1);

console.log(item.idLlamada)

this.eliminarService.eliminarLlamada(item.idLlamada).subscribe(
          data => {
              
              console.log(data.results);
      
                },
          err =>{
              console.log(err);
          
              let alert = this.alertCrtl.create({
                title: "Error de conexión",
                subTitle:"Ocurrio un problema para realizar la operación, intenta nuevamente<br><small>codigo: "+err.status+"</small>",
                buttons: [ 'Aceptar']
            });
             alert.present();
          }
          
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
