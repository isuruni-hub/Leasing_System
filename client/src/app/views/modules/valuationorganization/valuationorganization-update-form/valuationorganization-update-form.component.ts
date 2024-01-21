import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Valuationorganization} from '../../../../entities/valuationorganization';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ValuationorganizationService} from '../../../../services/valuationorganization.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {ResourceLink} from '../../../../shared/resource-link';
import {Valuationorganizationstatus} from '../../../../entities/valuationorganizationstatus';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-valuationorganization-update-form',
  templateUrl: './valuationorganization-update-form.component.html',
  styleUrls: ['./valuationorganization-update-form.component.scss']
})
export class ValuationorganizationUpdateFormComponent extends AbstractComponent implements OnInit {

  selectedId: number;
  valuationorganization: Valuationorganization;

  valuationorganizationstatuses:Valuationorganizationstatus[] = [];


  form = new FormGroup({

    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),

    contact1: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^([0][1-9][0-9]{8})$')
    ]),
    contact2: new FormControl(null, [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^([0][1-9][0-9]{8})$')
    ]),

    address: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(65535)
    ]),
    email: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.pattern('^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$')
    ]),
    fax: new FormControl(null, [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^([0][1-9][0-9]{8})$')
    ]),

    valuationorganizationstatus: new FormControl(null, [
      Validators.required,
    ]),

  });



  get nameField(): FormControl{
    return this.form.controls.name as FormControl;
  }


  get contact1Field(): FormControl{
    return this.form.controls.contact1 as FormControl;
  }

  get contact2Field(): FormControl{
    return this.form.controls.contact2 as FormControl;
  }

  get addressField(): FormControl{
    return this.form.controls.address as FormControl;
  }

  get emailField(): FormControl{
    return this.form.controls.email as FormControl;
  }

  get faxField(): FormControl{
    return this.form.controls.fax as FormControl;
  }

  get valuationorganizationstatusField(): FormControl{
    return this.form.controls.valuationorganizationstatus as FormControl;
  }

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private valuationorganizationService: ValuationorganizationService,
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

    this.valuationorganization = await this.valuationorganizationService.get(this.selectedId);
    this.setValues();
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VALUATIONORGANIZATION);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VALUATIONORGANIZATIONS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VALUATIONORGANIZATION_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VALUATIONORGANIZATION);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VALUATIONORGANIZATION);
  }

  discardChanges(): void{
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.setValues();
  }

  setValues(): void{
    if (this.nameField.pristine) {
      this.nameField.setValue(this.valuationorganization.name);
    }

    if (this.contact1Field.pristine) {
      this.contact1Field.setValue(this.valuationorganization.contact1);
    }
    if (this.contact2Field.pristine) {
      this.contact2Field.setValue(this.valuationorganization.contact2);
    }

    if (this.addressField.pristine) {
      this.addressField.setValue(this.valuationorganization.address);
    }

    if (this.emailField.pristine) {
      this.emailField.setValue(this.valuationorganization.email);
    }

    if (this.faxField.pristine) {
      this.faxField.setValue(this.valuationorganization.fax);
    }

    if (this.valuationorganizationstatusField.pristine) {
      this.valuationorganizationstatusField.setValue(this.valuationorganization.valuationorganizationstatus.id);
    }



  }

  async submit(): Promise<void> {

    const newvaluationorganization: Valuationorganization = new Valuationorganization();
    newvaluationorganization.name = this.nameField.value;
    newvaluationorganization.contact1 = this.contact1Field.value;
    newvaluationorganization.contact2 = this.contact2Field.value;
    newvaluationorganization.address = this.addressField.value;
    newvaluationorganization.email = this.emailField.value;
    newvaluationorganization.fax = this.faxField.value;
    newvaluationorganization.valuationorganizationstatus = this.valuationorganizationstatusField.value;


    try{
      const resourceLink: ResourceLink = await this.valuationorganizationService.update(this.selectedId, newvaluationorganization);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/valuationorganizations/' + resourceLink.id);
      } else {
        await this.router.navigateByUrl('/valuationorganizations');
      }
    }catch (e) {
      switch (e.status) {
        case 401: break;
        case 403: this.snackBar.open(e.error.message, null, {duration: 2000}); break;
        case 400:
          const msg = JSON.parse(e.error.message);
          let knownError = false;
          if (msg.name) { this.nameField.setErrors({server: msg.name}); knownError = true; }
          if (msg.contact1) { this.contact1Field.setErrors({server: msg.contact1}); knownError = true; }
          if (msg.contact2) { this.contact2Field.setErrors({server: msg.contact2}); knownError = true; }
          if (msg.address) { this.addressField.setErrors({server: msg.address}); knownError = true; }
          if (msg.email) { this.emailField.setErrors({server: msg.email}); knownError = true; }
          if (msg.fax) { this.faxField.setErrors({server: msg.fax}); knownError = true; }
          if (msg.valuationorganizationstatus) { this.valuationorganizationstatusField.setErrors({server: msg.valuationorganizationstatus}); knownError = true; }

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
