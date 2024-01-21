import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Broker, BrokerDataPage} from '../../../../entities/broker';
import {FormControl} from '@angular/forms';
import {BrokerService} from '../../../../services/broker.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageRequest} from '../../../../shared/page-request';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-broker-table',
  templateUrl: './broker-table.component.html',
  styleUrls: ['./broker-table.component.scss']
})
export class BrokerTableComponent extends AbstractComponent implements OnInit {

  brokerDataPage: BrokerDataPage;
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;


  codeField = new FormControl();
  nicField = new FormControl();
  nameField = new FormControl();


  constructor(
    private brokerService: BrokerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {

    await this.loadData();
    this.refreshData();
  }

  async loadData(): Promise<any> {
    this.updatePrivileges();

    if (!this.privilege.showAll) { return; }

    this.setDisplayedColumns();

    const pageRequest = new PageRequest();
    pageRequest.pageIndex  = this.pageIndex;
    pageRequest.pageSize  = this.pageSize;

    pageRequest.addSearchCriteria('code', this.codeField.value);
    pageRequest.addSearchCriteria('nic', this.nicField.value);
    pageRequest.addSearchCriteria('name', this.nameField.value);


    this.brokerService.getAll(pageRequest).then((page: BrokerDataPage) => {
      this.brokerDataPage = page;
    }).catch( e => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_BROKER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_BROKERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_BROKER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_BROKER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_BROKER);
  }

  setDisplayedColumns(): void{
    this.displayedColumns = [ 'code', 'name', 'nic'];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

  paginate(e): void{
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadData();
  }

  async delete(broker: Broker): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: broker.code + ' - ' + broker.name}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }
      try {
        await this.brokerService.delete(broker.id);
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
      this.loadData();
    });
  }

}
