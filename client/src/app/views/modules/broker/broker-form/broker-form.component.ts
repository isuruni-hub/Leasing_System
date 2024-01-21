import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Nametitle} from '../../../../entities/nametitle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BrokerService} from '../../../../services/broker.service';
import {NametitleService} from '../../../../services/nametitle.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Broker} from '../../../../entities/broker';
import {ResourceLink} from '../../../../shared/resource-link';

@Component({
  selector: 'app-broker-form',
  templateUrl: './broker-form.component.html',
  styleUrls: ['./broker-form.component.scss']
})
export class BrokerFormComponent extends AbstractComponent implements OnInit {

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
    private nametitleService: NametitleService,
  ) {super(); }


  ngOnInit(): void {
    this.loadData();
    this.refreshData();
  }



  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.add) { return; }

    this.nametitleService.getAll().then((nametitles) => {
      this.nametitles = nametitles;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

  }



  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_BROKER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_BROKERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_BROKER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_BROKER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_BROKER);
  }


  async submit(): Promise<void> {


    const broker: Broker = new Broker();

    broker.nametitle = this.nametitleField.value;
    broker.description = this.descriptionField.value;
    broker.name = this.nameField.value;
    broker.contact1 = this.contact1Field.value;
    broker.contact2 = this.contact2Field.value;
    broker.nic = this.nicField.value;
    broker.passport = this.passportField.value;
    broker.address = this.addressField.value;
    broker.email = this.emailField.value;
    broker.fax = this.faxField.value;

    try{
      const resourceLink: ResourceLink = await this.brokerService.add(broker);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/brokers/' + resourceLink.id);
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
          if (msg.nametitle) { this.nametitleField.setErrors({server: msg.nametitle}); knownError = true; }
          if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }
          if (msg.name) { this.nameField.setErrors({server: msg.name}); knownError = true; }
          if (msg.contact1) { this.contact1Field.setErrors({server: msg.contact1}); knownError = true; }
          if (msg.contact2) { this.contact2Field.setErrors({server: msg.contact2}); knownError = true; }
          if (msg.nic) { this.nicField.setErrors({server: msg.nic}); knownError = true; }
          if (msg.passport) { this.passportField.setErrors({server: msg.passport}); knownError = true; }
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
