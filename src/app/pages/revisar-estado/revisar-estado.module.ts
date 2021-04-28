import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RevisarEstadoPageRoutingModule } from '../revisar-estado/revisar-estado-routing.module';
import { RevisarEstado } from '../revisar-estado/revisar-estado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarEstadoPageRoutingModule
  ],
  declarations: [RevisarEstado]
})
export class RevisarEstadoModule { }
