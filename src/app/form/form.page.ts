import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {ActivityServices} from '../services/activity.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {


  nombre: string;
  email: string;
  tiempoActivacion: number;
  horaInicio: Date;
  horaFin: Date;

  datosJSON: any[] = [{}];


  constructor(private fb: FormBuilder, private navCtrl: NavController, private _activityServices : ActivityServices) {

  }

  usuario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    tiempoActivacion: ['', [Validators.required, Validators.minLength(3)]],
    horaInicio: ['', Validators.required],
    horaFin: ['', Validators.required],
  });


  ionViewWillEnter() {

    this.obtenerLocalStorage();

  }

  ngOnInit() {

  }

  ionViewDidEnter() {

    if (this.nombre == null) {

    } else {
      this.navegateHome();
    }

  }

  /**
   * guarda los datos en el local storage
   */
  guardarDatos() {
    this.datosJSON.push({
      "nombre": this.usuario.value["nombre"],
      "email": this.usuario.value["email"],
      "tiempoActivacion": this.usuario.value["tiempoActivacion"],
      "horaInicio": this.usuario.value["horaInicio"],
      "horaFin": this.usuario.value["horaFin"],
    })
    localStorage.clear();
    localStorage.setItem("datosApp", JSON.stringify(this.datosJSON));
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

  /**
   * nos redirige a la ventana home
   */
  navegateHome() {
    this.navCtrl.navigateForward('/home');
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
