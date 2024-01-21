import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Customer} from '../../../../entities/customer';
import {Nametitle} from '../../../../entities/nametitle';
import {Civilstatus} from '../../../../entities/civilstatus';
import {Gender} from '../../../../entities/gender';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NametitleService} from '../../../../services/nametitle.service';
import {CivilstatusService} from '../../../../services/civilstatus.service';
import {GenderService} from '../../../../services/gender.service';
import {DesignationService} from '../../../../services/designation.service';
import {CustomerService} from '../../../../services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DateHelper} from '../../../../shared/date-helper';
import {ResourceLink} from '../../../../shared/resource-link';
import {Customertype} from '../../../../entities/customertype';
import {Businesscategory} from '../../../../entities/businesscategory';
import {Nationality} from '../../../../entities/nationality';
import {CustomertypeService} from '../../../../services/customertype.service';
import {BusinesscategoryService} from '../../../../services/businesscategory.service';
import {Customersubtype} from '../../../../entities/customersubtype';
import {CustomersubtypeService} from '../../../../services/customersubtype.service';
import {CustomerstatusService} from '../../../../services/customerstatus.service';
import {Customerstatus} from '../../../../entities/customerstatus';
import {NationalityService} from '../../../../services/nationality.service';

@Component({
  selector: 'app-customer-update-form',
  templateUrl: './customer-update-form.component.html',
  styleUrls: ['./customer-update-form.component.scss']
})
export class CustomerUpdateFormComponent extends AbstractComponent implements OnInit {

  selectedId: number;
  customer: Customer;

  customertypes: Customertype[] = [];
  customerstatuses: Customerstatus[] = [];
  customersubtypes: Customersubtype[] = [];
  businesscategories: Businesscategory[] = [];
  civilstatuses: Civilstatus[] = [];
  nationalities: Nationality[] = [];
  nametitles: Nametitle[] = [];
  genders: Gender[] = [];


  form = new FormGroup({

    customerstatus: new FormControl(null, [
      Validators.required,
    ]),

    customertype: new FormControl(null, [
      Validators.required,
    ]),

    customersubtype: new FormControl(null, [
      Validators.required,
    ]),
    nametitle: new FormControl(null, [
      Validators.required,
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(null),
      Validators.maxLength(255),
    ]),
    photo: new FormControl(),
    cribno: new FormControl(null, [
      Validators.minLength(8),
      Validators.maxLength(9),
    ]),
    contact1: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^([0][0-9]{9})$'),
    ]),
    contact2: new FormControl(null, [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^([0][0-9]{9})$'),
    ]),
    address: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(65535),
    ]),
    nic: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(12),
      Validators.pattern('^(([0-9]{12})|([0-9]{9}[vVxX]))$'),
    ]),
    passport: new FormControl(null, [
      Validators.minLength(8),
      Validators.maxLength(9),
    ]),
    companyregno: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
    dob: new FormControl(null, [
      Validators.required,
    ]),
    gender: new FormControl(null, [
      Validators.required,
    ]),
    email: new FormControl(null, [
      Validators.minLength(5),
      Validators.maxLength(255),
      Validators.pattern('^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$'),
    ]),
    fax: new FormControl(null, [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^([0][1-9][0-9]{8})$')
    ]),
    civilstatus: new FormControl(null, [
      Validators.required,
    ]),
    nationality: new FormControl(null, [
      Validators.required,
    ]),
    businesscategory: new FormControl(null, [
      Validators.required,
    ]),
    proffesion: new FormControl(null, [
      Validators.required,
    ]),
    description: new FormControl(null, [
      Validators.minLength(null),
      Validators.maxLength(65535),
    ]),


  });

  get customerstatusField(): FormControl {
    return this.form.controls.customerstatus as FormControl;
  }

  get customertypeField(): FormControl {
    return this.form.controls.customertype as FormControl;
  }

  get customersubtypeField(): FormControl {
    return this.form.controls.customersubtype as FormControl;
  }

  get nametitleField(): FormControl {
    return this.form.controls.nametitle as FormControl;
  }

  get nameField(): FormControl {
    return this.form.controls.name as FormControl;
  }

  get photoField(): FormControl {
    return this.form.controls.photo as FormControl;
  }

  get cribnoField(): FormControl {
    return this.form.controls.cribno as FormControl;
  }

  get contact1Field(): FormControl {
    return this.form.controls.contact1 as FormControl;
  }

  get contact2Field(): FormControl {
    return this.form.controls.contact2 as FormControl;
  }

  get addressField(): FormControl {
    return this.form.controls.address as FormControl;
  }

  get nicField(): FormControl {
    return this.form.controls.nic as FormControl;
  }

  get passportField(): FormControl {
    return this.form.controls.passport as FormControl;
  }

  get companyregnoField(): FormControl {
    return this.form.controls.companyregno as FormControl;
  }

  get dobField(): FormControl {
    return this.form.controls.dob as FormControl;
  }

  get genderField(): FormControl {
    return this.form.controls.gender as FormControl;
  }

  get emailField(): FormControl {
    return this.form.controls.email as FormControl;
  }

  get faxField(): FormControl {
    return this.form.controls.fax as FormControl;
  }

  get civilstatusField(): FormControl {
    return this.form.controls.civilstatus as FormControl;
  }

  get nationalityField(): FormControl {
    return this.form.controls.nationality as FormControl;
  }

  get businesscategoryField(): FormControl {
    return this.form.controls.businesscategory as FormControl;
  }

  get proffesionField(): FormControl {
    return this.form.controls.proffesion as FormControl;
  }

  get descriptionField(): FormControl {
    return this.form.controls.description as FormControl;
  }


  constructor(
    private customerstatusService: CustomerstatusService,
    private customertypeService: CustomertypeService,
    private customersubtypeService: CustomersubtypeService,
    private businesscategoryService: BusinesscategoryService,
    private civilstatusService: CivilstatusService,
    private nationalityService: NationalityService,
    private nametitleService: NametitleService,
    private genderService: GenderService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
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

  async loadData(): Promise<any> {

    this.updatePrivileges();
    if (!this.privilege.update) {
      return; }

    this.customerstatusService.getAll().then((customerstatuses) => {
      this.customerstatuses = customerstatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.customertypeService.getAll().then((customertypes) => {
      this.customertypes = customertypes;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


    this.customersubtypeService.getAll().then((customersubtypes) => {
      this.customersubtypes = customersubtypes;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.businesscategoryService.getAll().then((businesscategories) => {
      this.businesscategories = businesscategories;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


    this.civilstatusService.getAll().then((civilstatuses) => {
      this.civilstatuses = civilstatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.nationalityService.getAll().then((nationalities) => {
      this.nationalities = nationalities;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.nametitleService.getAll().then((nametitles) => {
      this.nametitles = nametitles;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.genderService.getAll().then((genders) => {
      this.genders = genders;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.customer = await this.customerService.get(this.selectedId);
    this.setValues();

  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_CUSTOMER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_CUSTOMERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_CUSTOMER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_CUSTOMER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_CUSTOMER);
  }

  discardChanges(): void {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.setValues();
  }

  setValues(): void {

    if (this.customertypeField.pristine) {
      this.customertypeField.setValue(this.customer.customertype.id);
      this.changecustomertype();

    }

    if (this.customersubtypeField.pristine) {
      this.customersubtypeField.setValue(this.customer.customersubtype.id);
    }

    if (this.customerstatusField.pristine) {
      this.customerstatusField.setValue(this.customer.customerstatus.id);
    }

    if (this.nametitleField.pristine) {
      this.nametitleField.setValue(this.customer.nametitle.id);
    }

    if (this.nameField.pristine) {
      this.nameField.setValue(this.customer.name);
    }

    if (this.photoField.pristine) {
      if (this.customer.photo) {
        this.photoField.setValue([this.customer.photo]);
      } else {
        this.photoField.setValue([]);
      }
    }

    if (this.cribnoField.pristine) {
      this.cribnoField.setValue(this.customer.cribno);
    }

    if (this.contact1Field.pristine) {
      this.contact1Field.setValue(this.customer.contact1);
    }

    if (this.contact2Field.pristine) {
      this.contact2Field.setValue(this.customer.contact2);
    }

    if (this.addressField.pristine) {
      this.addressField.setValue(this.customer.address);
    }

    if (this.nicField.pristine) {
      this.nicField.setValue(this.customer.nic);
    }

    if (this.passportField.pristine) {
      this.passportField.setValue(this.customer.passport);
    }

    if (this.companyregnoField.pristine) {
      this.companyregnoField.setValue(this.customer.companyregno);
    }

    if (this.dobField.pristine) {
      this.dobField.setValue(this.customer.dob);
    }

    if (this.genderField.pristine) {
      this.genderField.setValue(this.customer.gender.id);
    }

    if (this.civilstatusField.pristine) {
      this.civilstatusField.setValue(this.customer.civilstatus.id);
    }

    if (this.nationalityField.pristine) {
      this.nationalityField.setValue(this.customer.nationality.id);
    }

    if (this.emailField.pristine) {
      this.emailField.setValue(this.customer.email);
    }

    if (this.faxField.pristine) {
      this.faxField.setValue(this.customer.fax);
    }

    if (this.businesscategoryField.pristine) {
      this.businesscategoryField.setValue(this.customer.businesscategory.id);
    }

    if (this.proffesionField.pristine) {
      this.proffesionField.setValue(this.customer.proffesion);
    }

    if (this.descriptionField.pristine) {
      this.descriptionField.setValue(this.customer.description);
    }

  }

  async submit(): Promise<void> {
    this.photoField.updateValueAndValidity();
    this.photoField.markAsTouched();
    if (this.form.invalid) {
      return;
    }

    const newcustomer: Customer = new Customer();
    newcustomer.customertype = this.customertypeField.value;
    newcustomer.customerstatus = this.customerstatusField.value;
    newcustomer.customersubtype = this.customersubtypeField.value;
    newcustomer.nametitle = this.nametitleField.value;
    newcustomer.name = this.nameField.value;
    const photoIds = this.photoField.value;
    if (photoIds !== null && photoIds !== []) {
      newcustomer.photo = photoIds[0];
    } else {
      newcustomer.photo = null;
    }

    newcustomer.cribno = this.cribnoField.value;
    newcustomer.contact1 = this.contact1Field.value;
    newcustomer.contact2 = this.contact2Field.value;
    newcustomer.address = this.addressField.value;
    newcustomer.nic = this.nicField.value;
    newcustomer.passport = this.passportField.value;
    newcustomer.companyregno = this.companyregnoField.value;
    newcustomer.dob = DateHelper.getDateAsString(this.dobField.value);
    newcustomer.gender = this.genderField.value;
    newcustomer.email = this.emailField.value;
    newcustomer.fax = this.faxField.value;
    newcustomer.civilstatus = this.civilstatusField.value;
    newcustomer.nationality = this.nationalityField.value;
    newcustomer.businesscategory = this.businesscategoryField.value;
    newcustomer.proffesion = this.proffesionField.value;
    newcustomer.description = this.descriptionField.value;


    try {

      const resourceLink: ResourceLink = await this.customerService.update(this.selectedId, newcustomer);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/customers/' + resourceLink.id);
      } else {
        await this.router.navigateByUrl('/customers');
      }
    } catch (e) {
      switch (e.status) {
        case 401:
          break;
        case 403:
          this.snackBar.open(e.error.message, null, {duration: 2000});
          break;
        case 400:
          const msg = JSON.parse(e.error.message);
          let knownError = false;
          if (msg.customertype) {
            this.customertypeField.setErrors({server: msg.customertype});
            knownError = true;
          }
          if (msg.customersubtype) {
            this.customersubtypeField.setErrors({server: msg.customersubtype});
            knownError = true;
          }
          if (msg.customerstatus) {
            this.customerstatusField.setErrors({server: msg.customerstatus});
            knownError = true;
          }
          if (msg.nametitle) {
            this.nametitleField.setErrors({server: msg.nametitle});
            knownError = true;
          }
          if (msg.name) {
            this.nameField.setErrors({server: msg.name});
            knownError = true;
          }
          if (msg.photo) {
            this.photoField.setErrors({server: msg.photo});
            knownError = true;
          }
          if (msg.cribno) {
            this.cribnoField.setErrors({server: msg.cribno});
            knownError = true;
          }
          if (msg.contact1) {
            this.contact1Field.setErrors({server: msg.contact1});
            knownError = true;
          }
          if (msg.contact2) {
            this.contact2Field.setErrors({server: msg.contact2});
            knownError = true;
          }
          if (msg.address) {
            this.addressField.setErrors({server: msg.address});
            knownError = true;
          }
          if (msg.nic) {
            this.nicField.setErrors({server: msg.nic});
            knownError = true;
          }
          if (msg.passport) {
            this.passportField.setErrors({server: msg.passport});
            knownError = true;
          }
          if (msg.companyregno) {
            this.companyregnoField.setErrors({server: msg.companyregno});
            knownError = true;
          }
          if (msg.dob) {
            this.dobField.setErrors({server: msg.dob});
            knownError = true;
          }
          if (msg.gender) {
            this.genderField.setErrors({server: msg.gender});
            knownError = true;
          }
          if (msg.email) {
            this.emailField.setErrors({server: msg.email});
            knownError = true;
          }
          if (msg.fax) {
            this.faxField.setErrors({server: msg.fax});
            knownError = true;
          }
          if (msg.civilstatus) {
            this.civilstatusField.setErrors({server: msg.civilstatus});
            knownError = true;
          }
          if (msg.nationality) {
            this.nationalityField.setErrors({server: msg.nationality});
            knownError = true;
          }
          if (msg.businesscategory) {
            this.businesscategoryField.setErrors({server: msg.businesscategory});
            knownError = true;
          }
          if (msg.proffesion) {
            this.proffesionField.setErrors({server: msg.proffesion});
            knownError = true;
          }
          if (msg.description) {
            this.descriptionField.setErrors({server: msg.description});
            knownError = true;
          }

          if (!knownError) {
            this.snackBar.open('Validation Error', null, {duration: 2000});
          }
          break;
        default:
          this.snackBar.open('Something is wrong', null, {duration: 2000});
      }
    }

  }

  changecustomertype() {
    if (this.customertypeField.value == 1 ){
      this.nicField.enable();
      this.nametitleField.enable();
      this.dobField.enable();
      this.genderField.enable();
      this.civilstatusField.enable();
      this.nationalityField.enable();
      this.companyregnoField.disable();
    }
    if (this.customertypeField.value == 2 ){
      this.nicField.disable();
      this.nametitleField.disable();
      this.dobField.disable();
      this.genderField.disable();
      this.civilstatusField.disable();
      this.nationalityField.disable();
      this.companyregnoField.enable();

    }
  }
}

