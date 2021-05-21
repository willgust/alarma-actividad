import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  
  nombre: string;
  email: string;
  tiempoActivacion: number;
  horaInicio: string;
  horaFin: string;
  horaInicioModificada: string;
  horaFinModificada: string;


  constructor() { 

  }

  ngOnInit() {
    this.obtenerLocalStorage();
    this.horaInicioModificada = this.horaInicio.substr(11,5);
    this.horaFinModificada = this.horaFin.substr(11,5);
  }


  obtenerLocalStorage(){
    let nombre = localStorage.getItem("nombre");
    let ejemplo = JSON.parse(localStorage.getItem("datosApp"));
    // let ejemplo = localStorage.getItem("datosApp");

    console.log("objeto recuperando " + ejemplo[1].nombre)

    
    this.nombre = ejemplo[1].nombre;
    this.email = ejemplo[1].email;
    this.tiempoActivacion = ejemplo[1].tiempoActivacion;
    this.horaInicio = ejemplo[1].horaInicio;
    this.horaFin = ejemplo[1].horaFin;
    
    console.log("nombre de susario " + this.nombre);
    console.log("email de usuario " + this.email);
    console.log("tiempo en min " + this.tiempoActivacion);
    console.log("hora de inicio " + this.horaInicio);
    console.log("hora de fin " + this.horaFin);
  }


}
