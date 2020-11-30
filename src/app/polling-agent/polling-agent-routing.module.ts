import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollingAgentPage } from './polling-agent.page';

const routes: Routes = [
  {
    path: '',
    component: PollingAgentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollingAgentPageRoutingModule {}
