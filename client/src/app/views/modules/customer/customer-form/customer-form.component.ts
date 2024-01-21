import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Nametitle} from '../../../../entities/nametitle';
import {Civilstatus} from '../../../../entities/civilstatus';
import {Gender} from '../../../../entities/gender';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NametitleService} from '../../../../services/nametitle.service';
import {CivilstatusService} from '../../../../services/civilstatus.service';
import {GenderService} from '../../../../services/gender.service';
import {CustomerService} from '../../../../services/customer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Customer} from '../../../../entities/customer';
import {DateHelper} from '../../../../shared/date-helper';
import {ResourceLink} from '../../../../shared/resource-link';
import {Customertype} from '../../../../entities/customertype';
import {Nationality} from '../../../../entities/nationality';
import {Businesscategory} from '../../../../entities/businesscategory';
import {CustomertypeService} from '../../../../services/customertype.service';
import {BusinesscategoryService} from '../../../../services/businesscategory.service';
import {NationalityService} from '../../../../services/nationality.service';
import {Customersubtype} from '../../../../entities/customersubtype';
import {CustomersubtypeService} from '../../../../services/customersubtype.service';
import {CustomerincomeSubFormComponent} from './customerincome-sub-form/customerincome-sub-form.component';
import {CustomerexpenseSubFormComponent} from './customerexpense-sub-form/customerexpense-sub-form.component';
import {District} from '../../../../entities/district';
import {DistrictService} from '../../../../services/district.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent extends AbstractComponent implements OnInit {

  @ViewChild(CustomerincomeSubFormComponent) customerincomeSubForm: CustomerincomeSubFormComponent;
  @ViewChild(CustomerexpenseSubFormComponent) customerexpenseSubForm: CustomerexpenseSubFormComponent;

  customertypes: Customertype[] = [];
  customersubtypes: Customersubtype[] = [];
  businesscategories: Businesscategory[] = [];
  civilstatuses: Civilstatus[] = [];
  nationalities: Nationality[] = [];
  nametitles: Nametitle[] = [];
  genders: Gender[] = [];
  districts: District[] = [];



  form = new FormGroup({
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

    district: new FormControl(null, [
      Validators.required,
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
    customerincome: new FormControl(),

    customerexpense: new FormControl(),

    description: new FormControl(null, [
      Validators.minLength(null),
      Validators.maxLength(65535),
    ]),


  });


  get customertypeField(): FormControl{
    return this.form.controls.customertype as FormControl;
  }

  get customersubtypeField(): FormControl{
    return this.form.controls.customersubtype as FormControl;
  }

  get nametitleField(): FormControl{
    return this.form.controls.nametitle as FormControl;
  }

  get nameField(): FormControl{
    return this.form.controls.name as FormControl;
  }

  get photoField(): FormControl{
    return this.form.controls.photo as FormControl;
  }

  get cribnoField(): FormControl{
    return this.form.controls.cribno as FormControl;
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

  get districtField(): FormControl{
    return this.form.controls.district as FormControl;
  }

  get nicField(): FormControl{
    return this.form.controls.nic as FormControl;
  }

  get passportField(): FormControl{
    return this.form.controls.passport as FormControl;
  }

  get companyregnoField(): FormControl{
    return this.form.controls. companyregno as FormControl;
  }

  get dobField(): FormControl{
    return this.form.controls.dob as FormControl;
  }

  get genderField(): FormControl{
    return this.form.controls.gender as FormControl;
  }

  get emailField(): FormControl{
    return this.form.controls.email as FormControl;
  }

  get faxField(): FormControl{
    return this.form.controls.fax as FormControl;
  }

  get civilstatusField(): FormControl{
    return this.form.controls.civilstatus as FormControl;
  }

  get nationalityField(): FormControl{
    return this.form.controls.nationality as FormControl;
  }

  get businesscategoryField(): FormControl{
    return this.form.controls.businesscategory as FormControl;
  }

  get proffesionField(): FormControl{
    return this.form.controls.proffesion as FormControl;
  }

  get customerincomeField(): FormControl{
    return this.form.controls.customerincome as FormControl;
  }

  get customerexpenseField(): FormControl{
    return this.form.controls.customerexpense as FormControl;
  }

  get descriptionField(): FormControl{
    return this.form.controls.description as FormControl;
  }





  constructor(
    private customertypeService: CustomertypeService,
    private customersubtypeService: CustomersubtypeService,
    private businesscategoryService: BusinesscategoryService,
    private civilstatusService: CivilstatusService,
    private nationalityService: NationalityService,
    private nametitleService: NametitleService,
    private genderService: GenderService,
    private districtService: DistrictService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.refreshData();
  }

  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.add) { return; }

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

    this.districtService.getAll().then((districts) => {
      this.districts = districts;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_CUSTOMER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_CUSTOMERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_CUSTOMER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_CUSTOMER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_CUSTOMER);
  }

  async submit(): Promise<void> {

    this.customerincomeSubForm.resetForm();
    this.customerincomeField.markAsDirty();
    this.customerexpenseSubForm.resetForm();
    this.customerexpenseField.markAsDirty();

    this.photoField.updateValueAndValidity();
    this.photoField.markAsTouched();
    if (this.form.invalid) { return; }

    const customer: Customer = new Customer();
    customer.customertype = this.customertypeField.value;
    customer.customersubtype = this.customersubtypeField.value;
    customer.nametitle = this.nametitleField.value;
    customer.name = this.nameField.value;
    const photoIds = this.photoField.value;
    if (photoIds !== null && photoIds !== []){
      customer.photo = photoIds[0];
    }else{
      customer.photo = null;
    }

    customer.cribno = this.cribnoField.value;
    customer.contact1 = this.contact1Field.value;
    customer.contact2 = this.contact2Field.value;
    customer.address = this.addressField.value;
    customer.nic = this.nicField.value;
    customer.passport = this.passportField.value;
    customer.district = this.districtField.value;
    customer.companyregno = this.companyregnoField.value;
    customer.dob = DateHelper.getDateAsString(this.dobField.value);
    customer.gender = this.genderField.value;
    customer.email = this.emailField.value;
    customer.fax = this.faxField.value;
    customer.civilstatus = this.civilstatusField.value;
    customer.nationality = this.nationalityField.value;
    customer.businesscategory = this.businesscategoryField.value;
    customer.proffesion = this.proffesionField.value;
    customer.customerincomeList = this.customerincomeField.value;
    customer.customerexpenseList = this.customerexpenseField.value;
    customer.description = this.descriptionField.value;



    try{
      const resourceLink: ResourceLink = await this.customerService.add(customer);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/customers/' + resourceLink.id);
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
          if (msg.customertype) { this.customertypeField.setErrors({server: msg.customertype}); knownError = true; }
          if (msg.customersubtype) { this.customersubtypeField.setErrors({server: msg.customersubtype}); knownError = true; }
          if (msg.nametitle) { this.nametitleField.setErrors({server: msg.nametitle}); knownError = true; }
          if (msg.name) { this.nameField.setErrors({server: msg.name}); knownError = true; }
          if (msg.photo) { this.photoField.setErrors({server: msg.photo}); knownError = true; }
          if (msg.cribno) { this.cribnoField.setErrors({server: msg.cribno}); knownError = true; }
          if (msg.contact1) { this.contact1Field.setErrors({server: msg.contact1}); knownError = true; }
          if (msg.contact2) { this.contact2Field.setErrors({server: msg.contact2}); knownError = true; }
          if (msg.address) { this.addressField.setErrors({server: msg.address}); knownError = true; }
          if (msg.district) { this.districtField.setErrors({server: msg.district}); knownError = true; }
          if (msg.nic) { this.nicField.setErrors({server: msg.nic}); knownError = true; }
          if (msg.passport) { this.passportField.setErrors({server: msg.passport}); knownError = true; }
          if (msg.companyregno) { this.companyregnoField.setErrors({server: msg.companyregno}); knownError = true; }
          if (msg.dob) { this.dobField.setErrors({server: msg.dob}); knownError = true; }
          if (msg.gender) { this.genderField.setErrors({server: msg.gender}); knownError = true; }
          if (msg.email) { this.emailField.setErrors({server: msg.email}); knownError = true; }
          if (msg.fax) { this.faxField.setErrors({server: msg.fax}); knownError = true; }
          if (msg.civilstatus) { this.civilstatusField.setErrors({server: msg.civilstatus}); knownError = true; }
          if (msg.nationality) { this.nationalityField.setErrors({server: msg.nationality}); knownError = true; }
          if (msg.businesscategory) { this.businesscategoryField.setErrors({server: msg.businesscategory}); knownError = true; }
          if (msg.proffesion) { this.proffesionField.setErrors({server: msg.proffesion}); knownError = true; }
          if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }


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

