import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Valuation} from '../../../../entities/valuation';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ValuationService} from '../../../../services/valuation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';

@Component({
  selector: 'app-valuation-detail',
  templateUrl: './valuation-detail.component.html',
  styleUrls: ['./valuation-detail.component.scss']
})
export class ValuationDetailComponent extends AbstractComponent implements OnInit {

  valuation: Valuation;
  selectedId: number;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private valuationService: ValuationService,
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
      data: {message: this.valuation.code + '-' +' ' + this.valuation.registrationno}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }

      try {
        await this.valuationService.delete(this.selectedId);
        await this.router.navigateByUrl('/valuations');
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
    });
  }

  async loadData(): Promise<any> {
    this.updatePrivileges();
    this.valuation = await this.valuationService.get(this.selectedId);
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VALUATION);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VALUATIONS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VALUATION_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VALUATION);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VALUATION);
  }
}
