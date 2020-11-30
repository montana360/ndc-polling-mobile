import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistrictOfficersPage } from './district-officers.page';

const routes: Routes = [
  {
    path: '',
    component: DistrictOfficersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistrictOfficersPageRoutingModule {}
