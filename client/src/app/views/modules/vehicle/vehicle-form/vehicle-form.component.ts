import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Vehicletype} from '../../../../entities/vehicletype';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VehicletypeService} from '../../../../services/vehicletype.service';
import {VehicleService} from '../../../../services/vehicle.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Vehicle} from '../../../../entities/vehicle';
import {DateHelper} from '../../../../shared/date-helper';
import {ResourceLink} from '../../../../shared/resource-link';
import {Fueltype} from '../../../../entities/fueltype';
import {Province} from '../../../../entities/province';
import {Country} from '../../../../entities/country';
import {Vehiclecondition} from '../../../../entities/vehiclecondition';
import {Brand} from '../../../../entities/brand';
import {FueltypeService} from '../../../../services/fueltype.service';
import {ProvinceService} from '../../../../services/province.service';
import {VehicleconditionService} from '../../../../services/vehiclecondition.service';
import {CountryService} from '../../../../services/country.service';
import {BrandService} from '../../../../services/brand.service';
import {VehiclemodelService} from '../../../../services/vehiclemodelservice';
import {Vehiclemodel} from '../../../../entities/vehiclemodel';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent extends AbstractComponent implements OnInit {

  fueltypes: Fueltype[]= [];
  vehiclemodels: Vehiclemodel[]= [];
  provinces: Province[]= [];
  vehicleconditions: Vehiclecondition[]= [];
  countries: Country[]= [];
  vehicletypes: Vehicletype[] = [];
  brands: Brand[] = [];



  form = new FormGroup({

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
    seatingcapacity: new FormControl(null, [
      Validators.required,
    ]),
  });


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

  get seatingcapacityField(): FormControl{
    return this.form.controls. seatingcapacity as FormControl;
  }


  constructor(
    private fueltypeService: FueltypeService,
    private vehiclemodelService: VehiclemodelService,
    private provinceService: ProvinceService,
    private vehicleconditionService: VehicleconditionService,
    private countryService: CountryService,
    private vehicletypeService: VehicletypeService,
    private brandService: BrandService,
    private vehicleService: VehicleService,
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


  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VEHICLE);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VEHICLES);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VEHICLE_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VEHICLE);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VEHICLE);
  }

  async submit(): Promise<void> {

    const vehicle: Vehicle = new Vehicle();
    vehicle.chassisnumber = this.chassisnumberField.value;
    vehicle.enginenumber = this.enginenumberField.value;
    vehicle.yearofmanufacture = DateHelper.getDateAsString(this.yearofmanufactureField.value);
    vehicle.dateofregistration = DateHelper.getDateAsString(this.dateofregistrationField.value);
    vehicle.color = this.colorField.value;
    vehicle.originalcolor = this.originalcolorField.value;
    vehicle.description = this.descriptionField.value;
    vehicle.enginecapacity = this.enginecapacityField.value;
    vehicle.fueltype = this.fueltypeField.value;
    vehicle.vehiclemodel = this.vehiclemodelField.value;
    vehicle.province = this.provinceField.value;
    vehicle.registrationno = this.registrationnoField.value;
    vehicle. vehiclecondition = this.vehicleconditionField.value;
    vehicle.country = this.countryField.value;
    vehicle.vehicletype = this.vehicletypeField.value;
    vehicle.brand = this.brandField.value;
    vehicle.seatingcapacity = this.seatingcapacityField.value;



    try{
      const resourceLink: ResourceLink = await this.vehicleService.add(vehicle);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/vehicles/' + resourceLink.id);
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
          if (msg.seatingcapacity) { this.seatingcapacityField.setErrors({server: msg.seatingcapacity}); knownError = true; }

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
