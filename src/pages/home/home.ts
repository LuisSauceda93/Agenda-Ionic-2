import { Component } from '@angular/core';
import { CrearService } from '../servicios/CrearService';
import { ListarService } from '../servicios/ListarService';
import { ActualizarService } from '../servicios/ActualizarService';
import { ContactPage } from '../contact/contact';
import { NavController,ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[CrearService,ListarService,ActualizarService]
})
export class HomePage {

contacto:{nombre?: string, 
         domicilio?: string,
         telefono?: string,
         correo?: string
        } = {};

        submitted = false;
        crearService
        listarService
        actualizarService
        currentUser
        retried

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              crearServices:CrearService,
              listarService:ListarService,
              actualizarService:ActualizarService) {

this.crearService=crearServices
this.listarService=listarService
this.actualizarService=actualizarService
this.retried = window.localStorage.getItem('dataUser')
this.currentUser =JSON.parse(this.retried)

if(this.currentUser != null){

this.contacto.nombre=this.currentUser[0].nombre
this.contacto.domicilio=this.currentUser[0].domicilio
this.contacto.telefono=this.currentUser[0].telefono
this.contacto.correo=this.currentUser[0].correo
}

  }

  onCrear(form){
    let contacto = window.localStorage.getItem('Contacto')
    console.log(contacto);
    let ret = window.localStorage.getItem('dataUser')
    let currentUser = JSON.parse(ret)
    console.log(currentUser[0].idContacto);
    
    
    console.log('Presione guardar');
    this.submitted = false;

    if(form.valid){

if(contacto==null){

   this.crearService.crearContacto(this.contacto.nombre,this.contacto.domicilio,this.contacto.telefono,this.contacto.correo).subscribe(
          data => {
              
              console.log(data.results);

      if(data.results.estatus == "ERROR"){

     
               let toast = this.toastCtrl.create({
    message: 'No se pudo guardado el contacto',
    duration: 2000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
      }

      if(data.results.estatus == "OK"){

    
     this.navCtrl.setRoot(ContactPage)
               let toast = this.toastCtrl.create({
    message: 'Contacto guardado',
    duration: 2000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
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

//servicio de editar contacto
}else{

 this.actualizarService.actualizarContacto(currentUser[0].idContacto,this.contacto.nombre,this.contacto.domicilio,this.contacto.telefono,this.contacto.correo).subscribe(
          data => {
              
              console.log(data.results);

      if(data.results.estatus == "ERROR"){

     
               let toast = this.toastCtrl.create({
    message: 'No se pudo guardado el contacto',
    duration: 2000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
      }

      if(data.results.estatus == "OK"){

    
     this.navCtrl.setRoot(ContactPage)
               let toast = this.toastCtrl.create({
    message: 'Contacto guardado',
    duration: 2000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
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
    

   
    
  }else{
       let toast = this.toastCtrl.create({
    message: "Es necesario llenar los campos de nombre y telefono",
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  }
 }




}
