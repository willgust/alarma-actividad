import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  status=false;
  

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
      alert("lo acabas de encender");
  }
  
  buttonOff() {
     // how to call this function when toggle button gets off?
     alert("lo acabas de apagar");
  }
  

}
