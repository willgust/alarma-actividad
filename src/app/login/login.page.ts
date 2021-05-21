import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  status=false;
  disable=true;
  condition =55;
  value ="Sausage"

  constructor() { }

  ngOnInit() {
    
    
    
  }

  onChange(){
    if(this.status){
      this.buttonOn();
    }
    else{
      this.buttonOff()
    }
  }
  
  buttonOn() { 
      // this function is called;
      console.log("lo acabas de encender");
      // this.funcionIntermedia();
      // console.log("en el on " + this.status);
      // this.cambiartoggle();
      // console.log("en el on 2 " + this.status);

      
  }
  
  buttonOff() {
     // how to call this function when toggle button gets off?
     console.log("lo acabas de apagar");
     console.log("en el off " + this.status);
  }

  cambiartoggle(){
    this.status= true;
    console.log("estoy llamando a cambiar toggle" + this.status);

  }

  funcionIntermedia(){
    console.log("intento apargar el boton");
    this.cambiartoggle();
  }

  async presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Confirm!';
    alert.message = 'Message <strong>no se peude activar a estas horas</strong>!!!';
    alert.buttons = [
     {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay')
          this.cambiartoggle();
        }
      }
    ];
  
    document.body.appendChild(alert);
    return alert.present();
  }
  
  

}
