import { Component, OnInit } from '@angular/core';
import {MockDashboardService} from '../services-mock/mock-dashboard.service';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})
export class DashboardStatsComponent implements OnInit {
  users = [];
  constructor(private dashboardService: MockDashboardService) { }
  ngOnInit() {
    this.dashboardService.getTopSellers().subscribe(u => this.users = u);
  }

}
