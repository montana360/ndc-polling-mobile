import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollingAgentPageRoutingModule } from './polling-agent-routing.module';

import { PollingAgentPage } from './polling-agent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PollingAgentPageRoutingModule
  ],
  declarations: [PollingAgentPage]
})
export class PollingAgentPageModule {}
