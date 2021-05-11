import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  infoUsuario: any[];
  nombre: string;
  email: string;
  tiempoActivacion: number;
  horaInicio: Date;
  horaFin: Date;

  datosJSON: any[] = [{}];

  datosJSONEjemplo: any[] = [
    {
      "nombre": "carlos",
      "email" : "algo@gmail.com",
      "tiempoActivacion" : 123,
      "horaInicio" : "19:30",
      "horaFin" : "20:00"
    }];


  constructor(private fb: FormBuilder) {

    // this.guardarLocalStorage();
    this.obtenerLocalStorage();
   }
  
  usuario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    tiempoActivacion: ['', [Validators.required, Validators.minLength(3)]],
    horaInicio: ['', Validators.required],
    horaFin: ['', Validators.required],
  });

  

  ngOnInit() {
  }

  guardarDatos(){

    this.datosJSON = [{}];

    console.log(this.usuario.value);
    this.nombre=this.usuario.value["nombre"];
    this.email=this.usuario.value["email"];
    this.tiempoActivacion=this.usuario.value["tiempoActivacion"];
    this.horaInicio=this.usuario.value["horaInicio"];
    this.horaFin=this.usuario.value["horaFin"];
    console.log(this.email);
    console.log("hora de inicio " + this.usuario.value["horaInicio"]);
    console.log(typeof this.usuario.value["horaFin"]);
    // console.log(this.usuario.);
    // this.nombre = this.usuario.

    // this.datosJSON.push({"nombre" : this.usuario.value["nombre"],
    //                      "email" : this.usuario.value["email"],
    //                      "tiempoActivacion" : this.usuario.value["tiempoActivacion"],
    //                      "horaInicio" : this.usuario.value["horaInicio"],
    //                      "horaFin" : this.usuario.value["horaFin"],                      
    //                     })
    
    this.datosJSON.push({"nombre" : this.nombre,
                         "email" : this.email,
                         "tiempoActivacion" : this.tiempoActivacion,
                         "horaInicio" : this.horaInicio,
                         "horaFin" : this.horaFin,                      
                        })


    console.log(this.datosJSON);
    console.log(this.nombre);                   
    console.log("datos json " + this.datosJSON[1].nombre);
    

    localStorage.clear();
    localStorage.setItem("datosApp",JSON.stringify(this.datosJSON));
    // this.infoUsuario.push(this.usuario.value);
    // console.log(this.infoUsuario);
  }

  // transformData(date){
    
  // }
  
  guardarLocalStorage(){
    
    localStorage.clear();
    let nombre: string = "carlos";
    // let ejemplo = [
    //   {
    //     "nombre": "carlos",
    //     "email" : "algo@gmail.com",
    //     "tiempoActivacion" : 123,
    //     "horaInicio" : "19:30",
    //     "horaFin" : "20:00"
    //   }];

    let ejemplo = this.datosJSONEjemplo;

      localStorage.setItem("nombre", nombre);
      localStorage.setItem("persona",JSON.stringify(this.datosJSONEjemplo));
  }

  obtenerLocalStorage(){
    let nombre = localStorage.getItem("nombre");
    let ejemplo = JSON.parse(localStorage.getItem("datosApp"));
    // let ejemplo = localStorage.getItem("datosApp");

    console.log("objeto recuperando " + ejemplo[1].nombre)
    console.log("este es el objeto " + this.datosJSON);
    console.log("este es el nombre " + this.datosJSON[0].nombre);
  }
}
