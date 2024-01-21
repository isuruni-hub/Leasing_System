import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Insurancecompany, InsurancecompanyDataPage} from '../../../../entities/insurancecompany';
import {FormControl} from '@angular/forms';
import {InsurancecompanyService} from '../../../../services/insurancecompany.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageRequest} from '../../../../shared/page-request';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {Insurancecompanystatus} from '../../../../entities/insurancecompanystatus';
import {InsurancecompanystatusService} from '../../../../services/insurancecompanystatusservice';

@Component({
  selector: 'app-insurancecompany-table',
  templateUrl: './insurancecompany-table.component.html',
  styleUrls: ['./insurancecompany-table.component.scss']
})
export class InsurancecompanyTableComponent extends AbstractComponent implements OnInit {

  insurancecompanyDataPage: InsurancecompanyDataPage;
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;

  insurancecompanystatuses: Insurancecompanystatus[] = [];

  codeField = new FormControl();
  nameField = new FormControl();
  insurancecompanystatusField = new FormControl();


  constructor(
    private insurancecompanystatusService: InsurancecompanystatusService,
    private insurancecompanyService: InsurancecompanyService,
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
    pageRequest.addSearchCriteria('insurancecompanystatus', this.insurancecompanystatusField.value);


    this.insurancecompanystatusService.getAll().then((insurancecompanystatuses) => {
      this.insurancecompanystatuses = insurancecompanystatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


    this.insurancecompanyService.getAll(pageRequest).then((page: InsurancecompanyDataPage) => {
      this.insurancecompanyDataPage = page;
    }).catch( e => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_INSURANCECOMPANY);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_INSURANCECOMPANIES);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_INSURANCECOMPANY_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_INSURANCECOMPANY);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_INSURANCECOMPANY);
  }

  setDisplayedColumns(): void{
    this.displayedColumns = [ 'code', 'name', 'status'];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

  paginate(e): void{
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadData();
  }

  async delete(insurancecompany: Insurancecompany): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: insurancecompany.code + ' - ' + insurancecompany.name}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }
      try {
        await this.insurancecompanyService.delete(insurancecompany.id);
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
      this.loadData();
    });
  }

}
