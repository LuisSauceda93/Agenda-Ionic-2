import { Component } from '@angular/core';
import { CrearService } from '../servicios/CrearService';
import { ListarService } from '../servicios/ListarService';
import { ContactPage } from '../contact/contact';
import { NavController,ToastController } from 'ionic-angular';

export var lista=[]
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[CrearService,ListarService]
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
        

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              crearServices:CrearService,
              listarService:ListarService) {

this.crearService=crearServices
this.listarService=listarService

  }

  onCrear(form){

    console.log('Presione guardar');
    this.submitted = false;

    if(form.valid){

    

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

     this.listaContactos()
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


 listaContactos(){

    this.listarService.mostrarContactos().subscribe(
          data => {
              
              console.log(data.results);
             lista = data.results;

                },
          err =>{
              console.log(err);
            
          }
          //() => console.log('Verificacion completa')
         );
  }

}
