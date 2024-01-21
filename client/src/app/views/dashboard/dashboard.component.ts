import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../shared/abstract-component';
import {LoggedUser} from '../../shared/logged-user';
import {UsecaseList} from '../../usecase-list';
import {DashboardService} from '../../services/dashboard.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AbstractComponent implements OnInit {

  recentCustomerCount = 0;

  public dashboardPrivilege = {
    showCustomers: false,

  };

  constructor(
    private snackBar: MatSnackBar,
     private dashboardService: DashboardService) {
    super();
  }

  ngOnInit(): void{
    this.loadData();
    this.refreshData();

  }

  async loadData(): Promise<any> {
    this.updatePrivileges();
    this.recentCustomerCount = await this.dashboardService.getRecentCustomerCount();
  }

  updatePrivileges(): any {
    this.dashboardPrivilege.showCustomers = LoggedUser.can(UsecaseList.SHOW_ALL_CUSTOMERS);
  }
}
