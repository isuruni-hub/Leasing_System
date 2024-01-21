import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Product} from '../../../../entities/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {ResourceLink} from '../../../../shared/resource-link';
import {Productstatus} from '../../../../entities/productstatus';
import {ProductstatusService} from '../../../../services/productstatus.service';

@Component({
  selector: 'app-product-update-form',
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.scss']
})
export class ProductUpdateFormComponent extends AbstractComponent implements OnInit {

  selectedId: number;
  product: Product;

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
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( async (params) => {
      this.selectedId =  + params.get('id');
      await this.loadData();
      this.refreshData();
    });
  }

  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.update) { return; }

    this.productstatusService.getAll().then((productstatuses) => {
      this.productstatuses = productstatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.product = await this.productService.get(this.selectedId);
    this.setValues();
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_PRODUCTS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_PRODUCT_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_PRODUCT);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_PRODUCT);
  }

  discardChanges(): void{
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.setValues();
  }

  setValues(): void{
    if (this.documentchargeField.pristine) {
      this.documentchargeField.setValue(this.product.documentcharge);
    }

    if (this.rateField.pristine) {
      this.rateField.setValue(this.product.rate);
    }

    if (this.maxdurationField.pristine) {
      this.maxdurationField.setValue(this.product.maxduration);
    }

    if (this.nameField.pristine) {
      this.nameField.setValue(this.product.name);
    }

    if (this.productstatusField.pristine) {
      this.productstatusField.setValue(this.product.productstatus.id);
    }

  }

  async submit(): Promise<void> {

    const newproduct: Product = new Product();
    newproduct.documentcharge = this.documentchargeField.value;
    newproduct.maxduration = this.maxdurationField.value;
    newproduct.rate = this.rateField.value;
    newproduct.name = this.nameField.value;
    newproduct.productstatus = this.productstatusField.value;

    try{
      const resourceLink: ResourceLink = await this.productService.update(this.selectedId, newproduct);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/products/' + resourceLink.id);
      } else {
        await this.router.navigateByUrl('/products');
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
