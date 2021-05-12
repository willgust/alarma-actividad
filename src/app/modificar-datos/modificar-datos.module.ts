import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ModificarDatosPageRoutingModule } from './modificar-datos-routing.module';

import { ModificarDatosPage } from './modificar-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModificarDatosPageRoutingModule
  ],
  declarations: [ModificarDatosPage]
})
export class ModificarDatosPageModule {}
