import { Component, OnInit } from '@angular/core';
import {Productstatus} from '../../../../entities/productstatus';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {ProductstatusService} from '../../../../services/productstatus.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Product} from '../../../../entities/product';
import {ResourceLink} from '../../../../shared/resource-link';
import {AbstractComponent} from '../../../../shared/abstract-component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends AbstractComponent implements OnInit {

  productstatuses: Productstatus[] = [];


  form = new FormGroup({
    documentcharge: new FormControl(null, [
      Validators.required,
    ]),
    rate: new FormControl(null, [
      Validators.required,
    ]),
    maxduration: new FormControl(null, [
      Validators.required,
    ]),
    name: new FormControl(null, [
      Validators.required,
    ]),
    productstatus: new FormControl(null, [
      Validators.required,
    ]),
  });


  get documentchargeField(): FormControl{
    return this.form.controls.documentcharge as FormControl;
  }

  get rateField(): FormControl{
    return this.form.controls.rate as FormControl;
  }

  get maxdurationField(): FormControl{
    return this.form.controls.maxduration as FormControl;
  }

  get nameField(): FormControl{
    return this.form.controls.name as FormControl;
  }

  get productstatusField(): FormControl{
    return this.form.controls.productstatus as FormControl;
  }



  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductService,
    private productstatusService: ProductstatusService,
  ) {super(); }


  ngOnInit(): void {
    this.loadData();
    this.refreshData();
  }



  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.add) { return; }


    this.productstatusService.getAll().then((productstatuses) => {
      this.productstatuses = productstatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }



  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_PRODUCTS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_PRODUCT_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_PRODUCT);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_PRODUCT);
  }


  async submit(): Promise<void> {


    const product: Product = new Product();

    product.documentcharge = this.documentchargeField.value;
    product.rate = this.rateField.value;
    product.maxduration = this.maxdurationField.value;
    product.name = this.nameField.value;
    product.productstatus = this.productstatusField.value;


    try{
      const resourceLink: ResourceLink = await this.productService.add(product);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/products/' + resourceLink.id);
      } else {
        this.form.reset();
        this.snackBar.open('Successfully saved', null, {duration: 2000});
      }
    }catch (e) {
      switch (e.status) {
        case 401: break;
        case 403: this.snackBar.open(e.error.message, null, {duration: 2000}); break;
        case 400:
          const msg = JSON.parse(e.error.message);
          let knownError = false;
          if (msg.documentcharge) { this.documentchargeField.setErrors({server: msg.documentcharge}); knownError = true; }
          if (msg.rate) { this.rateField.setErrors({server: msg.rate}); knownError = true; }
          if (msg.maxduration) { this.maxdurationField.setErrors({server: msg.maxduration}); knownError = true; }
          if (msg.name) { this.nameField.setErrors({server: msg.name}); knownError = true; }
          if (msg.productstatus) { this.productstatusField.setErrors({server: msg.productstatus}); knownError = true; }

          if (!knownError) {
            this.snackBar.open('Validation Error', null, {duration: 2000});
          }
          break;
        default:
          this.snackBar.open('Something is wrong', null, {duration: 2000});
      }
    }

  }

}
