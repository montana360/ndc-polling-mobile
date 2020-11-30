import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DistrictOfficersPageRoutingModule } from './district-officers-routing.module';

import { DistrictOfficersPage } from './district-officers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DistrictOfficersPageRoutingModule
  ],
  declarations: [DistrictOfficersPage]
})
export class DistrictOfficersPageModule {}
