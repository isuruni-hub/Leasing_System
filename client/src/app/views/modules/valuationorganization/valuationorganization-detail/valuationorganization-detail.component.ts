import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Valuationorganization} from '../../../../entities/valuationorganization';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ValuationorganizationService} from '../../../../services/valuationorganization.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';

@Component({
  selector: 'app-valuationorganization-detail',
  templateUrl: './valuationorganization-detail.component.html',
  styleUrls: ['./valuationorganization-detail.component.scss']
})
export class ValuationorganizationDetailComponent extends AbstractComponent implements OnInit {

  valuationorganization: Valuationorganization;
  selectedId: number;


  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private valuationorganizationService: ValuationorganizationService,
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
      data: {message: this.valuationorganization.code + ' - ' + this.valuationorganization.name}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }

      try {
        await this.valuationorganizationService.delete(this.selectedId);
        await this.router.navigateByUrl('/valuationorganizations');
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
    });
  }


  async loadData(): Promise<any> {
    this.updatePrivileges();
    this.valuationorganization = await this.valuationorganizationService.get(this.selectedId);

  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VALUATIONORGANIZATION);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VALUATIONORGANIZATIONS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VALUATIONORGANIZATION_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VALUATIONORGANIZATION);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VALUATIONORGANIZATION);
  }

}
