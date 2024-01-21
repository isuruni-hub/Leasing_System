import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Valuationorganization, ValuationorganizationDataPage} from '../../../../entities/valuationorganization';
import {Valuationorganizationstatus} from '../../../../entities/valuationorganizationstatus';
import {FormControl} from '@angular/forms';
import {ValuationorganizationService} from '../../../../services/valuationorganization.service';
import {ValuationorganizationstatusService} from '../../../../services/valuationorganizationstatus.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageRequest} from '../../../../shared/page-request';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-valuationorganization-table',
  templateUrl: './valuationorganization-table.component.html',
  styleUrls: ['./valuationorganization-table.component.scss']
})
export class ValuationorganizationTableComponent extends AbstractComponent implements OnInit {

  valuationorganizationDataPage: ValuationorganizationDataPage;
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;

  valuationorganizationstatuses: Valuationorganizationstatus[] = [];


  codeField = new FormControl();
  nameField = new FormControl();
  valuationorganizationstatusField = new FormControl();



  constructor(
    private valuationorganizationService: ValuationorganizationService,
    private valuationorganizationstatusService: ValuationorganizationstatusService,
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
    pageRequest.addSearchCriteria('name', this.nameField.value);
    pageRequest.addSearchCriteria('valuationorganizationstatus', this.valuationorganizationstatusField.value);

    this.valuationorganizationstatusService.getAll().then((valuationorganizationstatuses) => {
      this.valuationorganizationstatuses = valuationorganizationstatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });



    this.valuationorganizationService.getAll(pageRequest).then((page: ValuationorganizationDataPage) => {
      this.valuationorganizationDataPage = page;
    }).catch( e => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VALUATIONORGANIZATION);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VALUATIONORGANIZATIONS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VALUATIONORGANIZATION_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VALUATIONORGANIZATION);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VALUATIONORGANIZATION);
  }

  setDisplayedColumns(): void{
    this.displayedColumns = [ 'code', 'name', 'valuationorganizationstatus'];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

  paginate(e): void{
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadData();
  }

  async delete(valuationorganization: Valuationorganization): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: valuationorganization.code + ' - ' + valuationorganization.name}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }
      try {
        await this.valuationorganizationService.delete(valuationorganization.id);
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
      this.loadData();
    });
  }


}
