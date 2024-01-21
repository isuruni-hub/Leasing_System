import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Vehicle, VehicleDataPage} from '../../../../entities/vehicle';
import {FormControl} from '@angular/forms';
import {VehicleService} from '../../../../services/vehicle.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageRequest} from '../../../../shared/page-request';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {Vehicletype} from '../../../../entities/vehicletype';
import {VehicletypeService} from '../../../../services/vehicletype.service';
import {Vehiclecondition} from '../../../../entities/vehiclecondition';
import {VehicleconditionService} from '../../../../services/vehiclecondition.service';

@Component({
  selector: 'app-vehicle-table',
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.scss']
})
export class VehicleTableComponent extends AbstractComponent implements OnInit {

  vehicleDataPage: VehicleDataPage;
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;

  vehicletypes: Vehicletype[] = [];
  vehicleconditions: Vehiclecondition[] = [];

  codeField = new FormControl();
  registrationnoField = new FormControl();
  vehicletypeField = new FormControl();
  vehicleconditionField = new FormControl();

  constructor(
    private vehicletypeService: VehicletypeService,
    private vehicleconditionService: VehicleconditionService,
    private vehicleService: VehicleService,
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
    pageRequest.addSearchCriteria('vehicletype', this.vehicletypeField.value);
    pageRequest.addSearchCriteria('vehiclecondition', this.vehicleconditionField.value);

    this.vehicletypeService.getAll().then((vehicletypes) => {
      this.vehicletypes = vehicletypes;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.vehicleconditionService.getAll().then((vehicleconditions) => {
      this.vehicleconditions = vehicleconditions;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.vehicleService.getAll(pageRequest).then((page: VehicleDataPage) => {
      this.vehicleDataPage = page;
    }).catch( e => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VEHICLE);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VEHICLES);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VEHICLE_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VEHICLE);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VEHICLE);
  }

  setDisplayedColumns(): void{
    this.displayedColumns = ['code', 'registrationno','vehicletype','vehiclecondition'];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

  paginate(e): void{
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadData();
  }

  async delete(vehicle: Vehicle): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: vehicle.code + '-'+ ' ' + vehicle.registrationno}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }
      try {
        await this.vehicleService.delete(vehicle.id);
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
      this.loadData();
    });
  }


}
