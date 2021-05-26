import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import {ActivityServices} from '../services/activity.service';

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.page.html',
  styleUrls: ['./modificar-datos.page.scss'],
})
export class ModificarDatosPage implements OnInit {

  nombre: string;
  email: string;
  tiempoActivacion: number;
  horaInicio: string;
  horaFin: string;
  
  datosJSON: any[] = [{}];
 

  constructor(private fb: FormBuilder, private _activityServices : ActivityServices) {
   }

  usuario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    tiempoActivacion: ['', [Validators.required, Validators.minLength(3)]],
    horaInicio: ['', Validators.required],
    horaFin: ['', Validators.required],
  });


  ngOnInit() {
    this.obtenerLocalStorage();
    
   
  }

  /**
   * guarda los datos en el local storage
   */
  guardarDatos(){

    this.datosJSON = [{}];

    this.nombre=this.usuario.value["nombre"];
    this.email=this.usuario.value["email"];
    this.tiempoActivacion=this.usuario.value["tiempoActivacion"];
    this.horaInicio=this.usuario.value["horaInicio"];
    this.horaFin=this.usuario.value["horaFin"];
    
    this.datosJSON.push({"nombre" : this.nombre,
                         "email" : this.email,
                         "tiempoActivacion" : this.tiempoActivacion,
                         "horaInicio" : this.horaInicio,
                         "horaFin" : this.horaFin,                      
                        })

    localStorage.clear();
    localStorage.setItem("datosApp",JSON.stringify(this.datosJSON));

  }

  /**
   * descarga el local storage y lo mete en una variables
   */
  obtenerLocalStorage(){
    let nombre = localStorage.getItem("nombre");
    let ejemplo = JSON.parse(localStorage.getItem("datosApp"));
    
    this.nombre = ejemplo[1].nombre;
    this.email = ejemplo[1].email;
    this.tiempoActivacion = ejemplo[1].tiempoActivacion;
    this.horaInicio = ejemplo[1].horaInicio;
    this.horaFin = ejemplo[1].horaFin;
   
  }

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
  

}
