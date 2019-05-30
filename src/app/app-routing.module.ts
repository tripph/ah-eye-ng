import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardStatsComponent} from './dashboard-stats/dashboard-stats.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
