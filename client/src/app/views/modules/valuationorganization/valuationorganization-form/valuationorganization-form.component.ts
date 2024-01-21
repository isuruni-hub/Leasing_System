import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ValuationorganizationService} from '../../../../services/valuationorganization.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Valuationorganization} from '../../../../entities/valuationorganization';
import {ResourceLink} from '../../../../shared/resource-link';
import {Valuationorganizationstatus} from '../../../../entities/valuationorganizationstatus';
import {ValuationorganizationstatusService} from '../../../../services/valuationorganizationstatus.service';
import {AbstractComponent} from '../../../../shared/abstract-component';

@Component({
  selector: 'app-valuationorganization-form',
  templateUrl: './valuationorganization-form.component.html',
  styleUrls: ['./valuationorganization-form.component.scss']
})
export class ValuationorganizationFormComponent extends AbstractComponent implements OnInit {

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
    private valuationorganizationstatusService: ValuationorganizationstatusService,
  ) {super(); }

  ngOnInit(): void {
    this.loadData();
    this.refreshData();
  }

  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.add) { return; }

    this.valuationorganizationstatusService.getAll().then((valuationorganizationDataPage) => {
      this.valuationorganizationstatuses = valuationorganizationDataPage;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VALUATIONORGANIZATION);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VALUATIONORGANIZATIONS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VALUATIONORGANIZATION_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VALUATIONORGANIZATION);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VALUATIONORGANIZATION);
  }

  async submit(): Promise<void> {


    const valuationorganization: Valuationorganization = new Valuationorganization();

    valuationorganization.name = this.nameField.value;
    valuationorganization.contact1 = this.contact1Field.value;
    valuationorganization.contact2 = this.contact2Field.value;
    valuationorganization.address = this.addressField.value;
    valuationorganization.email = this.emailField.value;
    valuationorganization.fax = this.faxField.value;
    valuationorganization.valuationorganizationstatus = this.valuationorganizationstatusField.value;

    try{
      const resourceLink: ResourceLink = await this.valuationorganizationService.add(valuationorganization);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/valuationorganizations/' + resourceLink.id);
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
