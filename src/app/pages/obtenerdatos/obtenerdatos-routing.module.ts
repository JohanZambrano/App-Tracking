import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObtenerdatosPage } from './obtenerdatos.page';

const routes: Routes = [
  {
    path: '',
    component: ObtenerdatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObtenerdatosPageRoutingModule {}
