import { Injectable } from "@angular/core";




@Injectable({ providedIn:'root'})
export class ActivityServices{

    constructor(){
      
    }

    

    miGuardarDatos(datosJSON){
        
        localStorage.clear();
        localStorage.setItem("datosApp",JSON.stringify(datosJSON));
    }

    miObtenerDatos(){
        let ejemplo = JSON.parse(localStorage.getItem("datosApp"));

        return ejemplo;
    }

}

//import {ActivityServices} from '../services/activity.service';
//private _activityServices : ActivityServices

//servicios desde el service
  // guardadoConServices(){
  //   this.datosJSON.push({"nombre" : this.usuario.value["nombre"],
  //                        "email" : this.usuario.value["email"],
  //                        "tiempoActivacion" : this.usuario.value["tiempoActivacion"],
  //                        "horaInicio" : this.usuario.value["horaInicio"],
  //                        "horaFin" : this.usuario.value["horaFin"],                      
  //                       })
    
  //   this._activityServices.miGuardarDatos(this.datosJSON);
    
  // }

  // obtenerDatosService(){
  //   let datos = this._activityServices.miObtenerDatos();
  //   this.nombre = datos[1].nombre;
  //   this.email = datos[1].email;
  //   this.tiempoActivacion = datos[1].tiempoActivacion;
  //   this.horaInicio = datos[1].horaInicio;
  //   this.horaFin = datos[1].horaFin;
  // }

