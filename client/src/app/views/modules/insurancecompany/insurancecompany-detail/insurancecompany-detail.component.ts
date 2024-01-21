import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {InsurancecompanyService} from '../../../../services/insurancecompany.service';
import {Insurancecompany} from '../../../../entities/insurancecompany';


@Component({
  selector: 'app-insurancecompany-detail',
  templateUrl: './insurancecompany-detail.component.html',
  styleUrls: ['./insurancecompany-detail.component.scss']
})
export class InsurancecompanyDetailComponent extends AbstractComponent implements OnInit {

  insurancecompany: Insurancecompany;
  selectedId: number;


  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private insurancecompanyService: InsurancecompanyService,
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
      data: {message: this.insurancecompany.code + ' - ' + this.insurancecompany.name}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }

      try {
        await this.insurancecompanyService.delete(this.selectedId);
        await this.router.navigateByUrl('/insurancecompanies');
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
    });
  }


  async loadData(): Promise<any> {
    this.updatePrivileges();
    this.insurancecompany = await this.insurancecompanyService.get(this.selectedId);

  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_INSURANCECOMPANY);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_INSURANCECOMPANIES);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_INSURANCECOMPANY_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_INSURANCECOMPANY);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_INSURANCECOMPANY);
  }
}
