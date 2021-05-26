import { Injectable } from "@angular/core";




@Injectable({ providedIn:'root'})
export class ActivityServices{

    constructor(){
      
    }

    

    miGuardarDatos(datosJSON){
        
        localStorage.clear();
        localStorage.setItem("datosApp",JSON.stringify(datosJSON));
    }

    miObtenerDatos(){
        let ejemplo = JSON.parse(localStorage.getItem("datosApp"));

        return ejemplo;
    }

}

