import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OfferrequestService} from '../../../../services/offerrequest.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {PageRequest} from '../../../../shared/page-request';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Offerrequest} from '../../../../entities/offerrequest';
import {ResourceLink} from '../../../../shared/resource-link';
import {Branch} from '../../../../entities/branch';
import {Employee} from '../../../../entities/employee';
import {Vehicle} from '../../../../entities/vehicle';
import {Valuation} from '../../../../entities/valuation';
import {Branchmanagerapproval} from '../../../../entities/branchmanagerapproval';
import {Creditapproval} from '../../../../entities/creditapproval';
import {EmployeeService} from '../../../../services/employee.service';
import {BranchService} from '../../../../services/branch.service';
import {SupplierService} from '../../../../services/supplier.service';
import {VehicleService} from '../../../../services/vehicle.service';
import {ValuationService} from '../../../../services/valuation.service';
import {BranchmanagerapprovalService} from '../../../../services/branchmanagerapproval.service';
import {CreditapprovalService} from '../../../../services/creditapproval.service';
import {Supplier} from '../../../../entities/supplier';
import {Broker} from '../../../../entities/broker';
import {BrokerService} from '../../../../services/broker.service';

@Component({
  selector: 'app-offerrequest-form',
  templateUrl: './offerrequest-form.component.html',
  styleUrls: ['./offerrequest-form.component.scss']
})
export class OfferrequestFormComponent extends AbstractComponent implements OnInit {

  branches: Branch[]= [];
  employees: Employee[]= [];
  brokers: Broker[]= [];
  suppliers: Supplier[]= [];
  vehicles: Vehicle[]= [];
  valuations: Valuation[]= [];
  branchmanagerapprovals: Branchmanagerapproval[] = [];
  creditapprovals: Creditapproval[] = [];



  form = new FormGroup({

    branch: new FormControl(null, [
      Validators.required,
    ]),
    employee: new FormControl(null, [
      Validators.required,
    ]),
    broker: new FormControl(null, [
      Validators.required,
    ]),
    supplier: new FormControl(null, [
      Validators.required,
    ]),
    vehicle: new FormControl(null, [
      Validators.required,
    ]),
    valuation: new FormControl(null, [
      Validators.required,
    ]),
    amount: new FormControl(null, [
      Validators.required,
    ]),
    duration: new FormControl(null, [
      Validators.required,
    ]),
    rate: new FormControl(null, [
      Validators.required,
    ]),
    description: new FormControl(null, [
    ]),
    branchmanagerapproval: new FormControl(null, [
      Validators.required,
    ]),
    creditapproval: new FormControl(null, [
      Validators.required,
    ]),


  });



  get branchField(): FormControl{
    return this.form.controls.branch as FormControl;
  }

  get employeeField(): FormControl{
    return this.form.controls.employee as FormControl;
  }

  get brokerField(): FormControl{
    return this.form.controls.broker as FormControl;
  }

  get supplierField(): FormControl{
    return this.form.controls.supplier as FormControl;
  }

  get vehicleField(): FormControl{
    return this.form.controls.vehicle as FormControl;
  }

  get valuationField(): FormControl{
    return this.form.controls.valuation as FormControl;
  }

  get amountField(): FormControl{
    return this.form.controls.amount as FormControl;
  }

  get durationField(): FormControl{
    return this.form.controls.duration as FormControl;
  }

  get rateField(): FormControl{
    return this.form.controls.rate as FormControl;
  }

  get descriptionField(): FormControl{
    return this.form.controls.description as FormControl;
  }

  get branchmanagerapprovalField(): FormControl{
    return this.form.controls. branchmanagerapproval as FormControl;
  }

  get creditapprovalField(): FormControl{
    return this.form.controls.creditapproval as FormControl;
  }


  constructor(
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private brokerService: BrokerService,
    private supplierService: SupplierService,
    private vehicleService: VehicleService,
    private valuationService: ValuationService,
    private branchmanagerapprovalService: BranchmanagerapprovalService,
    private creditapprovalService: CreditapprovalService,
    private offerrequestService: OfferrequestService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    // this.refreshData();
  }

  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.add) { return; }

    this.branchService.getAllBasic(new PageRequest()).then((branches) => {
      this.branches = branches.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.employeeService.getAllBasic(new PageRequest()).then((employees) => {
      this.employees = employees.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.brokerService.getAllBasic(new PageRequest()).then((brokers) => {
      this.brokers = brokers.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.supplierService.getAllBasic(new PageRequest()).then((suppliers) => {
      this.suppliers = suppliers.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.vehicleService.getAllBasic(new PageRequest()).then((vehicles) => {
      this.vehicles = vehicles.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.valuationService.getAllBasic(new PageRequest()).then((valuations) => {
      this.valuations = valuations.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


    this.branchmanagerapprovalService.getAll().then((branchmanagerapprovals) => {
      this.branchmanagerapprovals = branchmanagerapprovals;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.creditapprovalService.getAll().then((creditapprovals) => {
      this.creditapprovals = creditapprovals;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VEHICLE);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VEHICLES);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VEHICLE_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VEHICLE);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VEHICLE);
  }

  async submit(): Promise<void> {

    const offerrequest: Offerrequest = new Offerrequest();
    offerrequest.branch = this.branchField.value;
    offerrequest.employee = this.employeeField.value;
    offerrequest.broker = this.brokerField.value;
    offerrequest.supplier = this.supplierField.value;
    offerrequest.vehicle = this.vehicleField.value;
    offerrequest.valuation = this.valuationField.value;
    offerrequest.amount = this.amountField.value;
    offerrequest.duration = this.durationField.value;
    offerrequest.rate = this.rateField.value;
    offerrequest.description = this.descriptionField.value;
    offerrequest.branchmanagerapproval = this.branchmanagerapprovalField.value;
    offerrequest.creditapproval = this.creditapprovalField.value;





    try{
      const resourceLink: ResourceLink = await this.offerrequestService.add(offerrequest);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/offerrequests/' + resourceLink.id);
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
          if (msg.branch) { this.branchField.setErrors({server: msg.branch}); knownError = true; }
          if (msg.employee) { this.employeeField.setErrors({server: msg.employee}); knownError = true; }
          if (msg.broker) { this.brokerField.setErrors({server: msg.broker}); knownError = true; }
          if (msg.supplier) { this.supplierField.setErrors({server: msg.supplier}); knownError = true; }
          if (msg.vehicle) { this.vehicleField.setErrors({server: msg.vehicle}); knownError = true; }
          if (msg.valuation) { this.valuationField.setErrors({server: msg.valuation}); knownError = true; }
          if (msg.amount) { this.amountField.setErrors({server: msg.amount}); knownError = true; }
          if (msg.duration) { this.durationField.setErrors({server: msg.duration}); knownError = true; }
          if (msg.rate) { this.rateField.setErrors({server: msg.rate}); knownError = true; }
          if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }
          if (msg.branchmanagerapproval) { this.branchmanagerapprovalField.setErrors({server: msg.branchmanagerapproval}); knownError = true; }
          if (msg.creditapproval) { this.creditapprovalField.setErrors({server: msg.creditapproval}); knownError = true; }
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
