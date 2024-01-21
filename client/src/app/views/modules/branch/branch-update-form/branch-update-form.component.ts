import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Branch} from '../../../../entities/branch';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {BranchService} from '../../../../services/branch.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {ResourceLink} from '../../../../shared/resource-link';
import {Branchstatus} from '../../../../entities/branchstatus';
import {BranchstatusService} from '../../../../services/branchstatus.service';

@Component({
  selector: 'app-branch-update-form',
  templateUrl: './branch-update-form.component.html',
  styleUrls: ['./branch-update-form.component.scss']
})
export class BranchUpdateFormComponent extends AbstractComponent implements OnInit {

  selectedId: number;
  branch: Branch;

  branchstatuses: Branchstatus[] = [];


  form = new FormGroup({


    description: new FormControl(null, [
      Validators.maxLength(65535),
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),



    tel1: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^([0][1-9][0-9]{8})$')
    ]),
    tel2: new FormControl(null, [
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
    branchstatus: new FormControl('1', [
      Validators.required,
    ]),

  });


  get descriptionField(): FormControl{
    return this.form.controls.description as FormControl;
  }

  get nameField(): FormControl{
    return this.form.controls.name as FormControl;
  }


  get tel1Field(): FormControl{
    return this.form.controls.tel1 as FormControl;
  }

  get tel2Field(): FormControl{
    return this.form.controls.tel2 as FormControl;
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

  get branchstatusField(): FormControl{
    return this.form.controls.branchstatus as FormControl;
  }


  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private branchService: BranchService,
    private route: ActivatedRoute,
    private branchstatusService: BranchstatusService,
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
    this.branchstatusService.getAll().then((branchstatuses) => {
      this.branchstatuses = branchstatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.branch = await this.branchService.get(this.selectedId);
    this.setValues();
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_BRANCH);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_BRANCHES);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_BRANCH_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_BRANCH);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_BRANCH);
  }

  discardChanges(): void{
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.setValues();
  }

  setValues(): void{

    if (this.descriptionField.pristine) {
      this.descriptionField.setValue(this.branch.description);
    }

    if (this.nameField.pristine) {
      this.nameField.setValue(this.branch.name);
    }

    if (this.tel1Field.pristine) {
      this.tel1Field.setValue(this.branch.tel1);
    }
    if (this.tel2Field.pristine) {
      this.tel2Field.setValue(this.branch.tel2);
    }

    if (this.addressField.pristine) {
      this.addressField.setValue(this.branch.address);
    }

    if (this.emailField.pristine) {
      this.emailField.setValue(this.branch.email);
    }

    if (this.faxField.pristine) {
      this.faxField.setValue(this.branch.fax);
    }

    if (this.branchstatusField.pristine) {
      this.branchstatusField.setValue(this.branch.branchstatus.id);
    }



  }

  async submit(): Promise<void> {

    const newbranch: Branch = new Branch();
    newbranch.name = this.nameField.value;
    newbranch.description = this.descriptionField.value;
    newbranch.tel1 = this.tel1Field.value;
    newbranch.tel2 = this.tel2Field.value;
    newbranch.address = this.addressField.value;
    newbranch.email = this.emailField.value;
    newbranch.fax = this.faxField.value;
    newbranch.branchstatus = this.branchstatusField.value;


    try{
      const resourceLink: ResourceLink = await this.branchService.update(this.selectedId, newbranch);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/branches/' + resourceLink.id);
      } else {
        await this.router.navigateByUrl('/branches');
      }
    }catch (e) {
      switch (e.status) {
        case 401: break;
        case 403: this.snackBar.open(e.error.message, null, {duration: 2000}); break;
        case 400:
          const msg = JSON.parse(e.error.message);
          let knownError = false;

          if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }
          if (msg.name) { this.nameField.setErrors({server: msg.name}); knownError = true; }
          if (msg.tel1) { this.tel1Field.setErrors({server: msg.tel1}); knownError = true; }
          if (msg.tel2) { this.tel2Field.setErrors({server: msg.tel2}); knownError = true; }
          if (msg.address) { this.addressField.setErrors({server: msg.address}); knownError = true; }
          if (msg.email) { this.emailField.setErrors({server: msg.email}); knownError = true; }
          if (msg.fax) { this.faxField.setErrors({server: msg.fax}); knownError = true; }
          if (msg.branchstatus) { this.branchstatusField.setErrors({server: msg.branchstatus.id}); knownError = true; }

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
