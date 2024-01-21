import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageRequest} from '../../../../shared/page-request';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {Productcategory} from '../../../../entities/productcategory';
import {ProductcategoryService} from '../../../../services/productcategory.service';
import {Offer, OfferDataPage} from '../../../../entities/offer';
import {OfferService} from '../../../../services/offer.service';

@Component({
  selector: 'app-offer-table',
  templateUrl: './offer-table.component.html',
  styleUrls: ['./offer-table.component.scss']
})
export class OfferTableComponent extends AbstractComponent implements OnInit {

  offerDataPage: OfferDataPage;
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;

  productcategories: Productcategory[] = [];

  codeField = new FormControl();
  // nameField = new FormControl();
  productcategoryField = new FormControl();


  constructor(
    private productcategoryService: ProductcategoryService,
    private offerService: OfferService,
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
    pageRequest.addSearchCriteria('productcategory', this.productcategoryField.value);



    this.productcategoryService.getAll().then((productcategories) => {
      this.productcategories = productcategories;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


    this.offerService.getAll(pageRequest).then((page: OfferDataPage) => {
      this.offerDataPage = page;
    }).catch( e => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_OFFER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_OFFERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_OFFER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_OFFER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_OFFER);
  }

  setDisplayedColumns(): void{
    this.displayedColumns = [ 'code', 'productcategory' ];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

  paginate(e): void{
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadData();
  }

  async delete(offer: Offer): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: offer.code}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }
      try {
        await this.offerService.delete(offer.id);
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
      this.loadData();
    });
  }
}
