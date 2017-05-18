import { Component } from '@angular/core';
import { NavController,AlertController, ToastController } from 'ionic-angular';
import { ListarService } from '../servicios/ListarService';
import { EliminarService } from '../servicios/EliminarService';
import { CrearService } from '../servicios/CrearService';
import { HomePage } from '../home/home';
import {CallNumber} from 'ionic-native';


export var llamada = []
export var llamadaCatalogo=[]

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[ListarService,EliminarService,CrearService]
})
export class ContactPage {

listarService
eliminarService
contactos=[]
crearService
contactoCatalogo=[]

searchQuery: string = '';

  constructor(public navCtrl: NavController,
              listarService:ListarService,
              eliminarService:EliminarService,
              public alertCrtl:AlertController,
              public toastCtrl: ToastController,
              crearService:CrearService,) {

      this.listarService=listarService
      this.eliminarService=eliminarService
      this.crearService=crearService
      this.listaContactos()
      this.listaLlamada()
     


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


this.listarService.estados().subscribe(
       data => {
  
        console.log(data.results);
          
         
 if(data.results.length === 0){
          let alert = this.alertCrtl.create({
      title: 'Atención!',
      subTitle: 'No existen solicitudes disponibles',
      buttons: ['Aceptar']
    });
    alert.present();
        }
          //console.log(data.results);
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

itemTappedEditar(event,item,index){

let data_user = []

data_user.push({idContacto:item.idContacto,nombre:item.nombre,domicilio:item.domicilio,telefono:item.telefono,correo:item.correo})
console.log(data_user);

window.localStorage.setItem('dataUser',JSON.stringify(data_user))

this.navCtrl.push(HomePage)

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

  listaLlamada(){

    this.listarService.mostrarLlamada().subscribe(
          data => {
              
              console.log(data.results);
             llamada = data.results;
             llamadaCatalogo= llamada;
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
    window.localStorage.removeItem('Contacto')
    window.localStorage.removeItem('dataUser')
    this.navCtrl.push(HomePage);
  }

}
