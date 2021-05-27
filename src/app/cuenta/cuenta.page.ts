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
    this.horaInicioModificada = this.horaInicio.substr(11, 5);
    this.horaFinModificada = this.horaFin.substr(11, 5);
  }

  /**
   * descarga el local storage y lo mete en una variables
   */
  obtenerLocalStorage() {
    let datos = JSON.parse(localStorage.getItem("datosApp"));

    this.nombre = datos[1].nombre;
    this.email = datos[1].email;
    this.tiempoActivacion = datos[1].tiempoActivacion;
    this.horaInicio = datos[1].horaInicio;
    this.horaFin = datos[1].horaFin;

  }


}
