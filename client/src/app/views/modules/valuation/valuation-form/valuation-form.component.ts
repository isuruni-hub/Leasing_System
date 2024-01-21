import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Fueltype} from '../../../../entities/fueltype';
import {Vehiclemodel} from '../../../../entities/vehiclemodel';
import {Province} from '../../../../entities/province';
import {Vehiclecondition} from '../../../../entities/vehiclecondition';
import {Country} from '../../../../entities/country';
import {Vehicletype} from '../../../../entities/vehicletype';
import {Brand} from '../../../../entities/brand';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FueltypeService} from '../../../../services/fueltype.service';
import {VehiclemodelService} from '../../../../services/vehiclemodelservice';
import {ProvinceService} from '../../../../services/province.service';
import {VehicleconditionService} from '../../../../services/vehiclecondition.service';
import {CountryService} from '../../../../services/country.service';
import {VehicletypeService} from '../../../../services/vehicletype.service';
import {BrandService} from '../../../../services/brand.service';
import {VehicleService} from '../../../../services/vehicle.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Vehicle} from '../../../../entities/vehicle';
import {DateHelper} from '../../../../shared/date-helper';
import {ResourceLink} from '../../../../shared/resource-link';
import {Valuationorganization} from '../../../../entities/valuationorganization';
import {Valuationstatus} from '../../../../entities/valuationstatus';
import {ValuationService} from '../../../../services/valuation.service';
import {ValuationorganizationService} from '../../../../services/valuationorganization.service';
import {ValuationstatusService} from '../../../../services/valuationstatus.service';
import {Valuation} from '../../../../entities/valuation';
import {PageRequest} from '../../../../shared/page-request';

@Component({
  selector: 'app-valuation-form',
  templateUrl: './valuation-form.component.html',
  styleUrls: ['./valuation-form.component.scss']
})
export class ValuationFormComponent extends AbstractComponent implements OnInit {

  fueltypes: Fueltype[]= [];
  vehiclemodels: Vehiclemodel[]= [];
  provinces: Province[]= [];
  vehicleconditions: Vehiclecondition[]= [];
  countries: Country[]= [];
  vehicletypes: Vehicletype[] = [];
  brands: Brand[] = [];
  valuationorganizations: Valuationorganization[] = [];
  valuationstatuses: Valuationstatus[] = [];
  vehicles: Vehicle[] = [];



  form = new FormGroup({

    vehicle: new FormControl(null, [
      Validators.required,
    ]),

    chassisnumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(null),
      Validators.maxLength(255),
    ]),
    enginenumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(null),
      Validators.maxLength(255),
    ]),
    yearofmanufacture: new FormControl(null, [
      Validators.required,
    ]),
    dateofregistration: new FormControl(null, [
      Validators.required,
    ]),
    color: new FormControl(),
    originalcolor: new FormControl(),
    description: new FormControl(null, [
      Validators.minLength(null),
      Validators.maxLength(65535),
    ]),
    enginecapacity: new FormControl(),

    fueltype: new FormControl(null, [
      Validators.required,
    ]),
    vehiclemodel: new FormControl(null, [
      Validators.required,
    ]),
    province: new FormControl(),
    registrationno: new FormControl(null, [
      Validators.required,
    ]),
    vehiclecondition: new FormControl(null, [
      Validators.required,
    ]),
    country: new FormControl(null, [
      Validators.required,
    ]),
    vehicletype: new FormControl(null, [
      Validators.required,
    ]),
    brand: new FormControl(null, [
      Validators.required,
    ]),
    odometerreading: new FormControl(),
    marketvalue: new FormControl(null, [
      Validators.required,
    ]),
    forcedsalesvalue: new FormControl(null, [
      Validators.required,
    ]),
    valuationdate: new FormControl(null, [
      Validators.required,
    ]),
    valuationorganization: new FormControl(null, [
      Validators.required,
    ]),
    valuationstatus: new FormControl(null, [
      Validators.required,
    ]),

  });

  get vehicleField(): FormControl{
    return this.form.controls.vehicle as FormControl;
  }


  get chassisnumberField(): FormControl{
    return this.form.controls.chassisnumber as FormControl;
  }

  get enginenumberField(): FormControl{
    return this.form.controls.enginenumber as FormControl;
  }

  get yearofmanufactureField(): FormControl{
    return this.form.controls.yearofmanufacture as FormControl;
  }

  get dateofregistrationField(): FormControl{
    return this.form.controls.dateofregistration as FormControl;
  }

  get colorField(): FormControl{
    return this.form.controls.color as FormControl;
  }

  get originalcolorField(): FormControl{
    return this.form.controls.originalcolor as FormControl;
  }

  get descriptionField(): FormControl{
    return this.form.controls.description as FormControl;
  }

  get enginecapacityField(): FormControl{
    return this.form.controls.enginecapacity as FormControl;
  }

  get fueltypeField(): FormControl{
    return this.form.controls.fueltype as FormControl;
  }

  get vehiclemodelField(): FormControl{
    return this.form.controls.vehiclemodel as FormControl;
  }

  get provinceField(): FormControl{
    return this.form.controls. province as FormControl;
  }

  get registrationnoField(): FormControl{
    return this.form.controls.registrationno as FormControl;
  }


  get vehicleconditionField(): FormControl{
    return this.form.controls.vehiclecondition as FormControl;
  }

  get countryField(): FormControl{
    return this.form.controls.country as FormControl;
  }


  get vehicletypeField(): FormControl{
    return this.form.controls.vehicletype as FormControl;
  }

  get brandField(): FormControl{
    return this.form.controls.brand as FormControl;
  }

  get odometerreadingField(): FormControl{
    return this.form.controls. odometerreading as FormControl;
  }

  get marketvalueField(): FormControl{
    return this.form.controls. marketvalue as FormControl;
  }

  get forcedsalesvalueField(): FormControl{
    return this.form.controls. forcedsalesvalue as FormControl;
  }

  get valuationdateField(): FormControl{
    return this.form.controls. valuationdate as FormControl;
  }

  get valuationorganizationField(): FormControl{
    return this.form.controls. valuationorganization as FormControl;
  }

  get valuationstatusField(): FormControl{
    return this.form.controls. valuationstatus as FormControl;
  }


  constructor(
    private fueltypeService: FueltypeService,
    private vehiclemodelService: VehiclemodelService,
    private provinceService: ProvinceService,
    private vehicleconditionService: VehicleconditionService,
    private countryService: CountryService,
    private vehicletypeService: VehicletypeService,
    private brandService: BrandService,
    private valuationorganizationService: ValuationorganizationService,
    private valuationstatusService: ValuationstatusService,
    private valuationService: ValuationService,
    private vehicleService: VehicleService,
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

    this.vehicleService.getAll(new PageRequest()).then((vehicles) => {
      this.vehicles = vehicles.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.vehicletypeService.getAll().then((vehicletypes) => {
      this.vehicletypes = vehicletypes;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.fueltypeService.getAll().then((fueltypes) => {
      this.fueltypes = fueltypes;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.vehiclemodelService.getAll().then((vehiclemodels) => {
      this.vehiclemodels = vehiclemodels;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.provinceService.getAll().then((provinces) => {
      this.provinces = provinces;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


    this.vehicleconditionService.getAll().then((vehicleconditions) => {
      this.vehicleconditions = vehicleconditions;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.countryService.getAll().then((countries) => {
      this.countries = countries;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.brandService.getAll().then((brands) => {
      this.brands = brands;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.valuationorganizationService.getAllBasic(new PageRequest()).then((valuationorganizations) => {
        this.valuationorganizations = valuationorganizations.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });


    this.valuationstatusService.getAll().then((valuationstatuses) => {
      this.valuationstatuses = valuationstatuses;
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

  setValues(vehicle: Vehicle): void {

    if (this.chassisnumberField.pristine) {
      this.chassisnumberField.setValue(vehicle.chassisnumber);
    }

    if (this.enginenumberField.pristine) {
      this.enginenumberField.setValue(vehicle.enginenumber);
    }

    if (this.yearofmanufactureField.pristine) {
      this.yearofmanufactureField.setValue(vehicle.yearofmanufacture);
    }

    if (this.dateofregistrationField.pristine) {
      this.dateofregistrationField.setValue(vehicle.dateofregistration);
    }

    if (this.colorField.pristine) {
      this.colorField.setValue(vehicle.color);
    }

    if (this.originalcolorField.pristine) {
      this.originalcolorField.setValue(vehicle.originalcolor);
    }


    if (this.enginecapacityField.pristine) {
      this.enginecapacityField.setValue(vehicle.enginecapacity);
    }

    if (this.fueltypeField.pristine) {
      this.fueltypeField.setValue(vehicle.fueltype.id);
    }

    if (this.vehiclemodelField.pristine) {
      this.vehiclemodelField.setValue(vehicle.vehiclemodel.id);
    }

    if (this.provinceField.pristine) {
      this.provinceField.setValue(vehicle.province.id);
    }

    if (this.registrationnoField.pristine) {
      this.registrationnoField.setValue(vehicle.registrationno);
    }

    if (this.vehicleconditionField.pristine) {
      this.vehicleconditionField.setValue(vehicle.vehiclecondition.id);
    }

    if (this.countryField.pristine) {
      this.countryField.setValue(vehicle.country.id);
    }

    if (this.vehicletypeField.pristine) {
      this.vehicletypeField.setValue(vehicle.vehicletype.id);
    }

    if (this.brandField.pristine) {
      this.brandField.setValue(vehicle.brand.id);
    }

  }

  async submit(): Promise<void> {

    const valuation: Valuation = new Valuation();
    valuation.chassisnumber = this.chassisnumberField.value;
    valuation.enginenumber = this.enginenumberField.value;
    valuation.yearofmanufacture = DateHelper.getDateAsString(this.yearofmanufactureField.value);
    valuation.dateofregistration = DateHelper.getDateAsString(this.dateofregistrationField.value);
    valuation.color = this.colorField.value;
    valuation.originalcolor = this.originalcolorField.value;
    valuation.description = this.descriptionField.value;
    valuation.enginecapacity = this.enginecapacityField.value;
    valuation.fueltype = this.fueltypeField.value;
    valuation.vehiclemodel = this.vehiclemodelField.value;
    valuation.province = this.provinceField.value;
    valuation.registrationno = this.registrationnoField.value;
    valuation. vehiclecondition = this.vehicleconditionField.value;
    valuation.country = this.countryField.value;
    valuation.vehicletype = this.vehicletypeField.value;
    valuation.brand = this.brandField.value;
    valuation.odometerreading = this.odometerreadingField.value;
    valuation.marketvalue = this.marketvalueField.value;
    valuation.forcedsalesvalue = this.forcedsalesvalueField.value;
    valuation.valuationdate = DateHelper.getDateAsString(this.valuationdateField.value);
    valuation.valuationorganization = this.valuationorganizationField.value;
    console.log(this.valuationorganizationField.value);
    valuation.valuationstatus = this.valuationstatusField.value;
    valuation.valuationstatus = this.valuationstatusField.value;
    valuation.vehicle = this.vehicleField.value;




    try{
      const resourceLink: ResourceLink = await this.valuationService.add(valuation);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/valuations/' + resourceLink.id);
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
          if (msg.chassisnumber) { this.chassisnumberField.setErrors({server: msg.chassisnumber}); knownError = true; }
          if (msg.enginenumber) { this.enginenumberField.setErrors({server: msg.enginenumber}); knownError = true; }
          if (msg.yearofmanufacture) { this.yearofmanufactureField.setErrors({server: msg.yearofmanufacture}); knownError = true; }
          if (msg.dateofregistration) { this.yearofmanufactureField.setErrors({server: msg.dateofregistration}); knownError = true; }
          if (msg.color) { this.colorField.setErrors({server: msg.color}); knownError = true; }
          if (msg.originalcolor) { this.originalcolorField.setErrors({server: msg.originalcolor}); knownError = true; }
          if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }
          if (msg.enginecapacity) { this.enginecapacityField.setErrors({server: msg.enginecapacity}); knownError = true; }
          if (msg.fueltype) { this.fueltypeField.setErrors({server: msg.fueltype}); knownError = true; }
          if (msg.vehiclemodel) { this.vehiclemodelField.setErrors({server: msg.vehiclemodel}); knownError = true; }
          if (msg.province) { this.provinceField.setErrors({server: msg.province}); knownError = true; }
          if (msg.registrationno) { this.registrationnoField.setErrors({server: msg.registrationno}); knownError = true; }
          if (msg.vehiclecondition) { this.vehicleconditionField.setErrors({server: msg.vehiclecondition}); knownError = true; }
          if (msg.country) { this.countryField.setErrors({server: msg.country}); knownError = true; }
          if (msg.vehicletype) { this.vehicletypeField.setErrors({server: msg.vehicletype}); knownError = true; }
          if (msg.brand) { this.brandField.setErrors({server: msg.brand}); knownError = true; }
          if (msg.odometerreading) { this.odometerreadingField.setErrors({server: msg.odometerreading}); knownError = true; }
          if (msg.marketvalue) { this.marketvalueField.setErrors({server: msg.marketvalue}); knownError = true; }
          if (msg.forcedsalesvalue) { this.forcedsalesvalueField.setErrors({server: msg.forcedsalesvalue}); knownError = true; }
          if (msg.valuationdate) { this.valuationdateField.setErrors({server: msg.valuationdate}); knownError = true; }
          if (msg.valuationorganization) { this.valuationorganizationField.setErrors({server: msg.valuationorganization}); knownError = true; }
          if (msg.valuationstatus) { this.valuationstatusField.setErrors({server: msg.valuationstatus}); knownError = true; }


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
