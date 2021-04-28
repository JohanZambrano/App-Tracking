import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarEstado } from '../revisar-estado/revisar-estado.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarEstado
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarEstadoPageRoutingModule {}
