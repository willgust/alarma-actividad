import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators   } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any
  public accX:any=0;
  public accY:any=0;
  public accZ:any=0;

  public oriX:any=0;
  public oriY:any=0;
  public oriZ:any=0;

  public controler: any;
  public count: any=0;
  public reset: any=0;

  private subscription: any;

  text: string ="iniciar";
  changebuttom: boolean = true;

  usuario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    tiempoActivacion: ['', [Validators.required, Validators.minLength(3)]],
    horaInicio: ['', Validators.required],
    horaFin: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,private gyroscope: Gyroscope,private deviceMotion: DeviceMotion, private emailComposer: EmailComposer) {}


  gyrascope(){

    let options: GyroscopeOptions = {
      frequency: 1000
    };
   
    this.gyroscope.getCurrent(options)
     .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestamp=orientation.timestamp;

      })
     .catch()
   
   
    this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
         console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
         this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestamp=orientation.timestamp;
      });
  }

  Accelerometer(){

    var options = { frequency: 200 };

    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
       console.log(acceleration),
       
       
   
    //  (error: any) => console.log(error)
 
    );
    
    // Watch device acceleration
    this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;

      if(this. accX == this.oriX && this. accY == this.oriY && this. accZ == this.oriZ){
        this.controler = "algo";
        console.log(this.count);

        this.count = this.count +1;

        //aqui creamos un if donde una vez en count tenga el valor q queremos dispare la alarma. EN CONSTRUCCION
        
      }else{

        this.oriX = this.accX;
        this.oriY = this.accY;
        this.oriZ = this.accZ;
        console.log(this.reset);

        this.reset = this.reset +1;
        this.count = 0;



      }

    
    });
    
  }

  stopAccelerometer(){
    this.subscription.unsubscribe();
  }
  
  sendEmail(){
    let email = {
      to: 'willgustarson@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      // ],
      subject: 'pruebas de envio',
      body: 'el tiempo paso y el correo de actividad se envio',
      isHtml: true
    };

    // Enviar un mensaje de texto utilizando las opciones por defecto
    this.emailComposer.open(email);
  }

  change_Buttom(){
    this.changebuttom = !this.changebuttom;
    if(this.changebuttom == true){
      this.text="Iniciar";
    }else{
      this.text="Parar";
    }
  }
}
