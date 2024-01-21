import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Broker} from '../../../../entities/broker';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {BrokerService} from '../../../../services/broker.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';

@Component({
  selector: 'app-broker-detail',
  templateUrl: './broker-detail.component.html',
  styleUrls: ['./broker-detail.component.scss']
})
export class BrokerDetailComponent extends AbstractComponent implements OnInit {

  broker: Broker;
  selectedId: number;


  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private brokerService: BrokerService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( async (params) => {
      this.selectedId = + params.get('id');
      try{
        await this.loadData();
      } finally {
        this.initialLoaded();
        this.refreshData();
      }
    });
  }


  async delete(): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: this.broker.code + ' - ' + this.broker.name}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }

      try {
        await this.brokerService.delete(this.selectedId);
        await this.router.navigateByUrl('/brokers');
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
    });
  }


  async loadData(): Promise<any> {
    this.updatePrivileges();
    this.broker = await this.brokerService.get(this.selectedId);

  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_BROKER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_BROKERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_BROKER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_BROKER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_BROKER);
  }

}
