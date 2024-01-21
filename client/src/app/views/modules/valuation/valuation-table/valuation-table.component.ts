import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Valuation, ValuationDataPage} from '../../../../entities/valuation';
import {FormControl} from '@angular/forms';
import {ValuationService} from '../../../../services/valuation.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageRequest} from '../../../../shared/page-request';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {Valuationstatus} from '../../../../entities/valuationstatus';
import {Valuationorganization} from '../../../../entities/valuationorganization';
import {ValuationstatusService} from '../../../../services/valuationstatus.service';
import {ValuationorganizationService} from '../../../../services/valuationorganization.service';

@Component({
  selector: 'app-valuation-table',
  templateUrl: './valuation-table.component.html',
  styleUrls: ['./valuation-table.component.scss']
})
export class ValuationTableComponent extends AbstractComponent implements OnInit {

  valuationDataPage: ValuationDataPage;
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;

  valuationstatuses: Valuationstatus[] = [];
  valuationorganizations: Valuationorganization[] = [];

  codeField = new FormControl();
  registrationnoField = new FormControl();
  valuationstatusField = new FormControl();
  valuationorganizationField = new FormControl();

  constructor(
    private valuationstatusService: ValuationstatusService,
    private valuationorganizationService: ValuationorganizationService,
    private valuationService: ValuationService,
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
    pageRequest.addSearchCriteria('registrationno', this.registrationnoField.value);
    pageRequest.addSearchCriteria('valuationstatus', this.valuationstatusField.value);
    pageRequest.addSearchCriteria('valuationorganization', this.valuationorganizationField.value);

    this.valuationstatusService.getAll().then((valuatiostatuses) => {
      this.valuationstatuses = valuatiostatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.valuationorganizationService.getAllBasic(new PageRequest()).then((valuationorganizations) => {
      this.valuationorganizations = valuationorganizations.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.valuationService.getAll(pageRequest).then((page: ValuationDataPage) => {
      this.valuationDataPage = page;
    }).catch( e => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VALUATION);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VALUATIONS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VALUATION_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VALUATION);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VALUATION);
  }

  setDisplayedColumns(): void{
    this.displayedColumns = ['code', 'registrationno','valuationstatus','valuationorganization'];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

  paginate(e): void{
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadData();
  }

  async delete(valuation: Valuation): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: valuation.code + '-'+ ' ' + valuation.registrationno}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }
      try {
        await this.valuationService.delete(valuation.id);
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
      this.loadData();
    });
  }

}
