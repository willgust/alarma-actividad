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

  datosJSON: any[] = [{}]

  datosJSONEjemplo: any[] = [
    {
      "nombre": "carlos",
      "email" : "algo@gmail.com",
      "tiempoActivacion" : 123,
      "horaInicio" : 19.30,
      "horaFin" : 20.00
    }];

  constructor(private fb: FormBuilder) { }
  
  usuario = this.fb.group({
    nombre: ['jorge', [Validators.required, Validators.minLength(4)]],
    email: ['sdf@g.com', [Validators.required, Validators.email]],
    tiempoActivacion: ['123', [Validators.required, Validators.minLength(3)]],
    horaInicio: ['2021-05-06T22:20:51.384+02:00', Validators.required],
    horaFin: ['08:20', Validators.required],
  });

  

  ngOnInit() {
  }

  guardarDatos(){
    console.log(this.usuario.value);
    this.email=this.usuario.value["email"];
    console.log(this.email);
    console.log(this.usuario.value["horaInicio"]);
    console.log(typeof this.usuario.value["horaFin"]);
    // console.log(this.usuario.);
    // this.nombre = this.usuario.

    this.datosJSON.push({"nombre" : this.usuario.value["nombre"],
                         "email" : this.usuario.value["email"],
                         "tiempoActivacion" : this.usuario.value["tiempoActivacion"],
                         "horaInicio" : this.usuario.value["horaInicio"],
                         "horaFin" : this.usuario.value["horaFin"],                      
                        })

    console.log("datos json " + this.datosJSONEjemplo[0].nombre);

    // this.infoUsuario.push(this.usuario.value);
    // console.log(this.infoUsuario);
  }

  // transformData(date){
    
  // }

}
