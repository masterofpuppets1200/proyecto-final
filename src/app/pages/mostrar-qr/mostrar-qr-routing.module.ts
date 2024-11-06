import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarQRPage } from './mostrar-qr.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarQRPageRoutingModule {}
