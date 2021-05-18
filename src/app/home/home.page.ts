import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators   } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import * as moment from 'moment';

import { ToastController } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

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

  audio: any

  nombre: string;
  email: string;
  tiempoActivacion: number;
  tiempoActivacionCount: number;
  horaInicio: string;
  horaFin: string;
  tiempoCorreo: number;
  tiempoAhora: string;

  horaInicioModificada: string;
  horaFinModificada: string;
  horaFinActual: string;
  horaActualModificada: string;

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

  private horaActual = new Date();

  constructor(private backgroundMode: BackgroundMode , private _toastContrl: ToastController , private fb: FormBuilder,private gyroscope: Gyroscope,private deviceMotion: DeviceMotion, private emailComposer: EmailComposer, private localNotifications: LocalNotifications) {

    // console.log("hora actual " + this.horaActual);
    // this.obtenerLocalStorage();
    // this.tiempoActivacionCount = (this.tiempoActivacion*60*5);
    // console.log("n1 de count total " + this.tiempoActivacionCount);
    // this.tiempoCorreo = (this.tiempoActivacionCount+ 900);

    // this.horaInicioModificada = this.horaInicio.substr(11,5);
    // this.horaFinModificada = this.horaFin.substr(11,5);
    // this.tiempoAhora = moment().format();;
    // this.horaActualModificada = this.tiempoAhora.substr(11,5);
    // console.log("hora de inicio modificada " + this.horaInicioModificada);
    // console.log("hora de fin modificada " + this.horaFinModificada);
    // console.log("mostrando tiempo de moment actual " + this.horaActualModificada);

    // var limitTime = this.DentroHorasLimite(this.horaInicioModificada,this.horaFinModificada,this.horaActualModificada);
    // console.log(limitTime);
    // console.log("inicio " + this.horaInicio);
    // console.log("fin " + this.horaFin);
    // console.log("actual " + this.horaActual);


  }
  ionViewWillEnter (){
    
    // this.backgroundMode.enable();
    this.obtenerLocalStorage();
    
  }
  ngOnInit() {

    this.audio = new Audio();
    this.audio.src = '../../assets/sound/002663916_prev.mp3';
    this.audio.load();

    

    // console.log("hora actual " + this.horaActual);
    // // this.obtenerLocalStorage();
    // console.log("tiempo de activacion " + this.tiempoActivacion);
    // this.tiempoActivacionCount = (this.tiempoActivacion*60*5);
    // console.log("n1 de count total " + this.tiempoActivacionCount);
    // this.tiempoCorreo = (this.tiempoActivacionCount+ 900);

    // this.horaInicioModificada = this.horaInicio.substr(11,5);
    // this.horaFinModificada = this.horaFin.substr(11,5);
    // this.tiempoAhora = moment().format();;
    // this.horaActualModificada = this.tiempoAhora.substr(11,5);
    // console.log("hora de inicio modificada " + this.horaInicioModificada);
    // console.log("hora de fin modificada " + this.horaFinModificada);
    // console.log("mostrando tiempo de moment actual " + this.horaActualModificada);

    // console.log("tiempo de activacion " + this.tiempoActivacion);
    // console.log("tiempo de contador xa activar " + this.tiempoActivacionCount);

    // var limitTime = this.DentroHorasLimite(this.horaInicioModificada,this.horaFinModificada,this.horaActualModificada);
    // console.log(limitTime);
    // console.log("inicio " + this.horaInicio);
    // console.log("fin " + this.horaFin);
    // console.log("actual " + this.horaActual);
    
    
  }


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
    this.tiempoActivacionCount = (this.tiempoActivacion*60*5);
    this.tiempoCorreo = (this.tiempoActivacionCount+ 900);
    this.horaInicioModificada = this.horaInicio.substr(11,5);
    this.horaFinModificada = this.horaFin.substr(11,5);
    this.tiempoAhora = moment().format();;
    this.horaActualModificada = this.tiempoAhora.substr(11,5);
    var limitTime = this.DentroHorasLimite(this.horaInicioModificada,this.horaFinModificada,this.horaActualModificada);

    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
       console.log(acceleration),
       
       
   
    //  (error: any) => console.log(error)
 
    );
    
    if(limitTime == false){
      // Watch device acceleration
      this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;
      // this.horaActual = new Date();
      // var limitTime = this.DentroHorasLimite(this.horaInicio,this.horaFin,this.horaActual);
      // console.log(limitTime);
      this.tiempoAhora = moment().format();;
      this.horaActualModificada = this.tiempoAhora.substr(11,5);
      var limitTime = this.DentroHorasLimite(this.horaInicioModificada,this.horaFinModificada,this.horaActualModificada);

      if(limitTime == false){
        //el contador y todos los demas condicionales empiezan a funcionar
        if(this. accX == this.oriX && this. accY == this.oriY && this. accZ == this.oriZ){
          this.controler = "algo";
          console.log(this.count);
  
          this.count = this.count +1;
  
          //aqui creamos un if donde una vez en count tenga el valor q queremos dispare la alarma. 
          if(this.tiempoActivacionCount == this.count ){
            //disparamos la alarma
            this.playAudio()
            
            //cuando el tiempo extra se haya cumplido mandamos el correo y cortamos la alarma
            if(this.tiempoCorreo == this.count){
              this.stopAudio();
              //mandamos el correo
              
            }
          }
        //al moverse el movil reseteamos el contador y si la alarma estuviera sonado la cortamos  
        }else{
  
          this.oriX = this.accX;
          this.oriY = this.accY;
          this.oriZ = this.accZ;
          console.log(this.reset);
  
          this.reset = this.reset +1;
          this.count = 0;
          this.stopAudio();

        }
          
      }else{
        //metemos un aviso de que en estas horas la aplicaciones esta configurada xa no funcionar y cortamos la ejecucion del subscribe(podriamos pausar la ejecucion y continuar cuando sea la hora, pero no me gusta la idea)
           this.TimeToast();
           this.stopAccelerometer();
      }
    
    });
    }else{
      this.TimeToast();
    }
    // // Watch device acceleration
    // this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
    //   console.log(acceleration);
    //   this.accX=acceleration.x;
    //   this.accY=acceleration.y;
    //   this.accZ=acceleration.z;
    //   // this.horaActual = new Date();
    //   // var limitTime = this.DentroHorasLimite(this.horaInicio,this.horaFin,this.horaActual);
    //   // console.log(limitTime);
    //   this.tiempoAhora = moment().format();;
    //   this.horaActualModificada = this.tiempoAhora.substr(11,5);
    //   var limitTime = this.DentroHorasLimite(this.horaInicioModificada,this.horaFinModificada,this.horaActualModificada);

    //   // if(limitTime == false){
    //   //   //el contador y todos los demas condicionales empiezan a funcionar
    //   // }else{
    //   //   //metemos un aviso de que en estas horas la aplicaciones esta configurada xa no funcionar y cortamos la ejecucion del subscribe
    //        //TimeToast();
    //        //stopAccelerometer();
    //   // }

    //   if(this. accX == this.oriX && this. accY == this.oriY && this. accZ == this.oriZ){
    //     this.controler = "algo";
    //     console.log(this.count);

    //     this.count = this.count +1;

    //     //aqui creamos un if donde una vez en count tenga el valor q queremos dispare la alarma. EN CONSTRUCCION
    //     if(this.tiempoActivacionCount == this.count ){
    //       //disparamos la alarma
    //       this.playAudio()

    //       if(this.tiempoCorreo == this.count){
    //         this.stopAudio();
    //         //mandamos el correo
            
    //       }
    //     }
        
    //   }else{

    //     this.oriX = this.accX;
    //     this.oriY = this.accY;
    //     this.oriZ = this.accZ;
    //     console.log(this.reset);

    //     this.reset = this.reset +1;
    //     this.count = 0;
    //     this.stopAudio();



    //   }

    
    // });
    
  }

  stopAccelerometer(){
    this.subscription.unsubscribe();
    this.count = 0;
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

  obtenerLocalStoragePromise(){
    let ejemplo = JSON.parse(localStorage.getItem("datosApp"));
    const GetEjemplo = () => {
      return new Promise((resolve, reject) =>{
        setTimeout(() => {
          resolve(ejemplo);
        }, 1500);
      })
    }

  }

  //da false si no esta dentro de las horas y true en caso de si estarlo
  DentroHorasLimite (startTimeModificado ,  endTimeModificado ,  serverTimeModificado){
    let  start  =  moment ( startTimeModificado ,  "H: mm" );
    let  end  =  moment ( endTimeModificado ,  "H: mm" );
    let  server  =  moment ( serverTimeModificado ,  "H: mm" );
    if (end < start) {
      return server >= start && server<= moment('23:59:59', "h:mm:ss") || server>= moment('0:00:00', "h:mm:ss") && server < end;
  }
  return server>= start && server< end

  // DentroHorasLimite('22:30', '3:00', '23:50') //return true
  // DentroHorasLimite('22:30', '3:00', '1:50') //return true
  // DentroHorasLimite('22:30', '3:00', '4:50') //return false
  }

  playAudio() { 
    this.audio.play(); 
    this.audio.loop = true; 
  }

  stopAudio() { 
    this.audio.pause();
  }

  async TimeToast() {
    const toast = await this._toastContrl.create({
      message: 'En este horario no se puede activar la alarma, revise su configuración.',
      duration: 2000,
      position : 'bottom'
    });
    toast.present();
  }

}
