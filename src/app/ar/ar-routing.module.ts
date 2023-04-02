import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ARPage } from './ar.page';

const routes: Routes = [
  {
    path: '',
    component: ARPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ARPageRoutingModule {}
