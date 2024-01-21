import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {InsurancecompanyService} from '../../../../services/insurancecompany.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Insurancecompany} from '../../../../entities/insurancecompany';
import {ResourceLink} from '../../../../shared/resource-link';
import {Insurancecompanystatus} from '../../../../entities/insurancecompanystatus';
import {InsurancecompanystatusService} from '../../../../services/insurancecompanystatusservice';

@Component({
  selector: 'app-insurancecompany-form',
  templateUrl: './insurancecompany-form.component.html',
  styleUrls: ['./insurancecompany-form.component.scss']
})
export class InsurancecompanyFormComponent extends AbstractComponent implements OnInit {

  insurancecompanystatuses: Insurancecompanystatus[] = [];


  form = new FormGroup({
    insurancecompanystatus: new FormControl(null, [
      Validators.required,
    ]),

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




  });

  get insurancecompanystatusField(): FormControl{
    return this.form.controls.insurancecompanystatus as FormControl;
  }

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


  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private insurancecompanyService: InsurancecompanyService,
    private insurancecompanystatusService: InsurancecompanystatusService,
  ) {super(); }


  ngOnInit(): void {
    this.loadData();
    this.refreshData();
  }



  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.add) { return; }

    this.insurancecompanystatusService.getAll().then((insurancecompanystatuses) => {
      this.insurancecompanystatuses = insurancecompanystatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }



  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_INSURANCECOMPANY);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_INSURANCECOMPANIES);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_INSURANCECOMPANY_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_INSURANCECOMPANY);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_INSURANCECOMPANY);
  }


  async submit(): Promise<void> {

    // @ts-ignore
    const insurancecompany: Insurancecompany = new Insurancecompany();

    insurancecompany.insurancecompanystatus = this.insurancecompanystatusField.value;
    insurancecompany.name = this.nameField.value;
    insurancecompany.contact1 = this.contact1Field.value;
    insurancecompany.contact2 = this.contact2Field.value;
    insurancecompany.address = this.addressField.value;
    insurancecompany.email = this.emailField.value;
    insurancecompany.fax = this.faxField.value;

    try{
      const resourceLink: ResourceLink = await this.insurancecompanyService.add(insurancecompany);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/insurancecompanies/' + resourceLink.id);
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
          if (msg.insurancecompanystatus) { this.insurancecompanystatusField.setErrors({server: msg.insurancecompanstatus}); knownError = true; }
          if (msg.name) { this.nameField.setErrors({server: msg.name}); knownError = true; }
          if (msg.contact1) { this.contact1Field.setErrors({server: msg.contact1}); knownError = true; }
          if (msg.contact2) { this.contact2Field.setErrors({server: msg.contact2}); knownError = true; }
          if (msg.address) { this.addressField.setErrors({server: msg.address}); knownError = true; }
          if (msg.email) { this.emailField.setErrors({server: msg.email}); knownError = true; }
          if (msg.fax) { this.faxField.setErrors({server: msg.fax}); knownError = true; }


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
