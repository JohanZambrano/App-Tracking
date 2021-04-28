import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObtenerdatosPageRoutingModule } from './obtenerdatos-routing.module';

import { ObtenerdatosPage } from './obtenerdatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObtenerdatosPageRoutingModule
  ],
  declarations: [ObtenerdatosPage]
})
export class ObtenerdatosPageModule {}
