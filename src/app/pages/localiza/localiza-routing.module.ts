import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalizaPage } from './localiza.page';

const routes: Routes = [
  {
    path: '',
    component: LocalizaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalizaPageRoutingModule {}
