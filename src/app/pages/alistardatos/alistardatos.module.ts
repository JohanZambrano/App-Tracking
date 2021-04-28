import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlistardatosPageRoutingModule } from './alistardatos-routing.module';

import { AlistardatosPage } from './alistardatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlistardatosPageRoutingModule
  ],
  declarations: [AlistardatosPage]
})
export class AlistardatosPageModule {}
