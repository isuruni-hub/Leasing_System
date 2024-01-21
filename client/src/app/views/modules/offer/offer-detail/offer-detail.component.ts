import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Offer} from '../../../../entities/offer';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {OfferService} from '../../../../services/offer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent extends AbstractComponent implements OnInit {

  offer: Offer;
  selectedId: number;


  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private offerService: OfferService,
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
      data: {message: this.offer.code}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }

      try {
        await this.offerService.delete(this.selectedId);
        await this.router.navigateByUrl('/offers');
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
    });
  }


  async loadData(): Promise<any> {
    this.updatePrivileges();
    this.offer = await this.offerService.get(this.selectedId);

  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_OFFER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_OFFERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_OFFER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_OFFER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_OFFER);
  }

}
