import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx'

import { Media, MediaObject } from '@ionic-native/media/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Gyroscope,
    DeviceMotion,
    EmailComposer,
    LocalNotifications,
    Media,
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
