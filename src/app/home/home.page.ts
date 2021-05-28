import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import * as moment from 'moment';

import { ToastController } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';

import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import {ActivityServices} from '../services/activity.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public accX: any = 0;
  public accY: any = 0;
  public accZ: any = 0;

  public oriX: any = 0;
  public oriY: any = 0;
  public oriZ: any = 0;

  public count: any = 0;
  public reset: any = 0;

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

  text: string = "iniciar";
  changebuttom: boolean = true;

  status: boolean = false;
  disable = false;

  
  constructor(private _activityServices : ActivityServices, public foregroundService: ForegroundService, 
    private backgroundMode: BackgroundMode, private _toastContrl: ToastController,private gyroscope: Gyroscope, 
    private deviceMotion: DeviceMotion) {

  }
  ionViewWillEnter() {
    this.startService();
    this.backgroundMode.enable();
    this.obtenerLocalStorage();

  }
  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '../../assets/sound/002663916_prev.mp3';
    this.audio.load();

  }

  startService() {
    this.foregroundService.start('Guard Alarm', 'Background Service');
  }

  stopService() {
    // Disable the foreground service
    this.foregroundService.stop();
  }

  /**
   * Esta función comprobara si estamos dentro de la hora limitTime(donde puede ejecutarse el resto) y se subcribira a deviceMOtion obteniendo lecturas del acelerometro y tendra unos condicionantes para el resto de la logica de la funcion
   */
  Accelerometer() {

    var options = { frequency: 200 };
    this.tiempoActivacionCount = (this.tiempoActivacion * 60 * 5);
    this.tiempoCorreo = (this.tiempoActivacionCount + 900);
    this.horaInicioModificada = this.horaInicio.substr(11, 5);
    this.horaFinModificada = this.horaFin.substr(11, 5);
    this.tiempoAhora = moment().format();;
    this.horaActualModificada = this.tiempoAhora.substr(11, 5);
    var limitTime = this.DentroHorasLimite(this.horaInicioModificada, this.horaFinModificada, this.horaActualModificada);

    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
        console.log(acceleration),
    );

    if (limitTime == false) {
      this.TimeToast("guard alarm ha sido activado");
      // viendo device acceleration
      this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        this.accX = acceleration.x;
        this.accY = acceleration.y;
        this.accZ = acceleration.z;

        this.tiempoAhora = moment().format();;
        this.horaActualModificada = this.tiempoAhora.substr(11, 5);
        var limitTime = this.DentroHorasLimite(this.horaInicioModificada, this.horaFinModificada, this.horaActualModificada);

        if (limitTime == false) {
          //el contador y todos los demas condicionales empiezan a funcionar

          if (this.accX == this.oriX && this.accY == this.oriY && this.accZ == this.oriZ) {
            this.count = this.count + 1;

            //aqui creamos un if donde una vez en count tenga el valor q queremos dispare la alarma. 
            if (this.tiempoActivacionCount == this.count) {
              //disparamos la alarma
              this.playAudio();
            }

            //cuando el tiempo extra se haya cumplido mandamos el correo y cortamos la alarma y el programa
            if (this.tiempoCorreo == this.count) {
              this.stopAudio();
              //mandamos el correo
              this.sendMailJS();
              this.stopAccelerometer();
            }

            //al moverse el movil reseteamos el contador y si la alarma estuviera sonado la cortamos  
          } else {
            this.oriX = this.accX;
            this.oriY = this.accY;
            this.oriZ = this.accZ;
            //console.log(this.reset);

            this.reset = this.reset + 1;
            this.count = 0;
            this.stopAudio();
          }

        } else {
          //metemos un aviso de que en estas horas la aplicaciones esta configurada xa no funcionar y ponemos el count a 0
          this.TimeToast('En este horario no se puede activar la alarma, revise su configuración.');
          //  this.stopAccelerometer();
          this.count = 0;
        }

      });
    } else {
      this.presentAlert();

    }

  }

  /**
   * se desuscribe del servicio
   */
  stopAccelerometer() {
    this.subscription.unsubscribe();
    this.count = 0;
    this.TimeToast("guard alarm se ha detenido");
    this.status = false;

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
   * detecta si estamos dentro de las horas de exclusion o no
   * @param startTimeModificado hora de ir a dormir
   * @param endTimeModificado hora de despertarse
   * @param serverTimeModificado hora actual
   * @returns da false si no esta dentro de las horas y true en caso de si estarlo
   */
  DentroHorasLimite(startTimeModificado, endTimeModificado, serverTimeModificado) {
    let start = moment(startTimeModificado, "H: mm");
    let end = moment(endTimeModificado, "H: mm");
    let server = moment(serverTimeModificado, "H: mm");
    if (end < start) {
      return server >= start && server <= moment('23:59:59', "h:mm:ss") || server >= moment('0:00:00', "h:mm:ss") && server < end;
    }
    return server >= start && server < end

    // DentroHorasLimite('22:30', '3:00', '23:50') //return true
    // DentroHorasLimite('22:30', '3:00', '1:50') //return true
    // DentroHorasLimite('22:30', '3:00', '4:50') //return false
  }

  /**
   * activa el sonido
   */
  playAudio() {
    this.audio.play();
    this.audio.loop = true;
  }

  /**
   * detiene el sonido
   */
  stopAudio() {
    this.audio.pause();
  }

  /**
   * 
   * @param string texto del aviso
   */
  async TimeToast(string) {
    const toast = await this._toastContrl.create({
      message: string,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  /**
   * funcion para el envio del correo
   */
  sendMailJS() {
    var tempParams = {
      from_name: "Activity Guard",
      to_name: this.nombre,
      message: "ha pasado el tiempo de actividad marcado de " + this.tiempoActivacion + " minutos",
      user_email: this.email
    };
    emailjs.send('service_kcju8h4', 'template_9xzhqh7', tempParams, 'user_uQL2GaHT3dQd2acMvxJBB')
      .then(function (res) {
        console.log("exito", res.status);
      })
  }

  /**
   * funcion para activar el toggle en funcion de su estado
   */
  onChange() {
    if (this.status) {
      this.buttonOn();
    }
    else {
      this.buttonOff()
    }
  }

  /**
   * cuando activamos el boton desde on
   */
  buttonOn() {
    this.Accelerometer();
  }

  /**
   * cuando activamos el boton desde off
   */
  buttonOff() {
    this.stopAccelerometer();
  }

  /**
   * cambia el estado el toggle 
   */
  cambiartoggle() {

    console.log("estoy ejecutando el cambio de toggle " + this.status);
    this.status = false;
    console.log("estoy ejecutando el cambio de toggle " + this.status);

  }

  /**
   * muestra un mensaje de aviso que hay q aceptar y cambia el valor del status
   * @returns 
   */
  async presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Confirma';
    alert.message = '<strong>En este horario no se puede activar la alarma, revise su configuración.</strong>!';
    alert.buttons = [
      {
        text: 'Aceptar',
        handler: () => {
          console.log('Confirm Okay')
          this.status = false;
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
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
