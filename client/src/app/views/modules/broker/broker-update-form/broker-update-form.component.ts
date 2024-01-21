import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Broker} from '../../../../entities/broker';
import {Nametitle} from '../../../../entities/nametitle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {BrokerService} from '../../../../services/broker.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {ResourceLink} from '../../../../shared/resource-link';

@Component({
  selector: 'app-broker-update-form',
  templateUrl: './broker-update-form.component.html',
  styleUrls: ['./broker-update-form.component.scss']
})
export class BrokerUpdateFormComponent extends AbstractComponent implements OnInit {

  selectedId: number;
  broker: Broker;

  nametitles: Nametitle[] = [];


  form = new FormGroup({

    nametitle: new FormControl(null, [
      Validators.required,
    ]),

    description: new FormControl(null, [
      Validators.maxLength(65535),
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

  get nametitleField(): FormControl{
    return this.form.controls.nametitle as FormControl;
  }

  get descriptionField(): FormControl{
    return this.form.controls.description as FormControl;
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

  get nicField(): FormControl{
    return this.form.controls.nic as FormControl;
  }

  get passportField(): FormControl{
    return this.form.controls.passport as FormControl;
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
    private brokerService: BrokerService,
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

    this.broker = await this.brokerService.get(this.selectedId);
    this.setValues();
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_BROKER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_BROKERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_BROKER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_BROKER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_BROKER);
  }

  discardChanges(): void{
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.setValues();
  }

  setValues(): void{
    if (this.nametitleField.pristine) {
      this.nametitleField.setValue(this.broker.nametitle.id);
    }

    if (this.descriptionField.pristine) {
      this.descriptionField.setValue(this.broker.description);
    }

    if (this.nameField.pristine) {
      this.nameField.setValue(this.broker.name);
    }

    if (this.contact1Field.pristine) {
      this.contact1Field.setValue(this.broker.contact1);
    }
    if (this.contact2Field.pristine) {
      this.contact2Field.setValue(this.broker.contact2);
    }
    if (this.nicField.pristine) {
      this.nicField.setValue(this.broker.nic);
    }
    if (this.passportField.pristine) {
      this.passportField.setValue(this.broker.nic);
    }

    if (this.addressField.pristine) {
      this.addressField.setValue(this.broker.address);
    }

    if (this.emailField.pristine) {
      this.emailField.setValue(this.broker.email);
    }

    if (this.faxField.pristine) {
      this.faxField.setValue(this.broker.fax);
    }



  }

  async submit(): Promise<void> {

    const newbroker: Broker = new Broker();
    newbroker.name = this.nameField.value;
    newbroker.nametitle = this.nametitleField.value;
    newbroker.description = this.descriptionField.value;
    newbroker.contact1 = this.contact1Field.value;
    newbroker.contact2 = this.contact2Field.value;
    newbroker.nic = this.nicField.value;
    newbroker.passport = this.passportField.value;
    newbroker.address = this.addressField.value;
    newbroker.email = this.emailField.value;
    newbroker.fax = this.faxField.value;


    try{
      const resourceLink: ResourceLink = await this.brokerService.update(this.selectedId, newbroker);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/brokers/' + resourceLink.id);
      } else {
        await this.router.navigateByUrl('/brokers');
      }
    }catch (e) {
      switch (e.status) {
        case 401: break;
        case 403: this.snackBar.open(e.error.message, null, {duration: 2000}); break;
        case 400:
          const msg = JSON.parse(e.error.message);
          let knownError = false;
          if (msg.nametitle) { this.nametitleField.setErrors({server: msg.nametitle}); knownError = true; }
          if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }
          if (msg.name) { this.nameField.setErrors({server: msg.name}); knownError = true; }
          if (msg.contact1) { this.contact1Field.setErrors({server: msg.contact1}); knownError = true; }
          if (msg.contact2) { this.contact2Field.setErrors({server: msg.contact2}); knownError = true; }
          if (msg.nic) { this.nicField.setErrors({server: msg.nic}); knownError = true; }
          if (msg.passport) { this.passportField.setErrors({server: msg.nic}); knownError = true; }
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
