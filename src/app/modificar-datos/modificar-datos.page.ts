import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

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
  // horaInicioModificada: string;
  // horaFinModificada: string;
  // horaFinActual: string;
  // horaActualModificada: string;

  // tiempoAhora: string;

  // private horaActual = new Date();

  datosJSON: any[] = [{}];

  constructor(private fb: FormBuilder) {

    // this.obtenerLocalStorage();
    // // this.horaInicioModificada = this.horaInicio.substr(11,5);
    // // this.horaFinModificada = this.horaFin.substr(11,5);
    // // console.log("hora de inicio modificada " + this.horaInicioModificada);
    // // console.log("hora de fin modificada " + this.horaFinModificada);
    
    // // this.tiempoAhora = moment().format();;
    // // var tiempoAhora2 =moment(this.tiempoAhora,"H:mm");
    // // console.log("mostrando tiempo de moment " + this.tiempoAhora);
    // // this.horaActualModificada = this.tiempoAhora.substr(11,5);
    // // console.log("mostrando tiempo de moment actual " + this.horaActualModificada);

    // // var limiteTiempo = this.DentroHorasLimite(this.horaInicioModificada,this.horaFinModificada,this.horaActualModificada );
    // // console.log("esta dentro de la franja " + limiteTiempo);
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

  obtenerLocalStorage(){
    let nombre = localStorage.getItem("nombre");
    let ejemplo = JSON.parse(localStorage.getItem("datosApp"));
    

    
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

  // //da false si no esta dentro de las horas y true en caso de si estarlo
  // DentroHorasLimite (startTime ,  endTime ,  serverTime){
  //   let  start  =  moment ( startTime ,  "H: mm" );
  //   let  end  =  moment ( endTime ,  "H: mm" );
  //   let  server  =  moment ( serverTime ,  "H: mm" );
  //   if (end < start) {
  //     return server >= start && server<= moment('23:59:59', "h:mm:ss") || server>= moment('0:00:00', "h:mm:ss") && server < end;
  // }
  // return server>= start && server< end

  // // DentroHorasLimite('22:30', '3:00', '23:50') //return true
  // // DentroHorasLimite('22:30', '3:00', '1:50') //return true
  // // DentroHorasLimite('22:30', '3:00', '4:50') //return false
  // }

}
