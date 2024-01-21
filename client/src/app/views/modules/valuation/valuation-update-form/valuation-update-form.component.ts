import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Valuation} from '../../../../entities/valuation';
import {Fueltype} from '../../../../entities/fueltype';
import {Province} from '../../../../entities/province';
import {Country} from '../../../../entities/country';
import {Brand} from '../../../../entities/brand';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FueltypeService} from '../../../../services/fueltype.service';
import {ProvinceService} from '../../../../services/province.service';
import {CountryService} from '../../../../services/country.service';
import {BrandService} from '../../../../services/brand.service';
import {ValuationService} from '../../../../services/valuation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DateHelper} from '../../../../shared/date-helper';
import {ResourceLink} from '../../../../shared/resource-link';
import {Vehiclemodel} from '../../../../entities/vehiclemodel';
import {Vehiclecondition} from '../../../../entities/vehiclecondition';
import {Vehicletype} from '../../../../entities/vehicletype';
import {Valuationorganization} from '../../../../entities/valuationorganization';
import {Valuationstatus} from '../../../../entities/valuationstatus';
import {VehiclemodelService} from '../../../../services/vehiclemodelservice';
import {VehicleconditionService} from '../../../../services/vehiclecondition.service';
import {VehicletypeService} from '../../../../services/vehicletype.service';
import {ValuationorganizationService} from '../../../../services/valuationorganization.service';
import {ValuationstatusService} from '../../../../services/valuationstatus.service';
import {PageRequest} from '../../../../shared/page-request';
import {Vehicle} from '../../../../entities/vehicle';

@Component({
  selector: 'app-valuation-update-form',
  templateUrl: './valuation-update-form.component.html',
  styleUrls: ['./valuation-update-form.component.scss']
})
export class ValuationUpdateFormComponent extends AbstractComponent implements OnInit {

  selectedId: number;
  valuation: Valuation;

  fueltypes: Fueltype[]= [];
  vehiclemodels: Vehiclemodel[]= [];
  provinces: Province[]= [];
  vehicleconditions: Vehiclecondition[]= [];
  countries: Country[]= [];
  vehicletypes: Vehicletype[] = [];
  brands: Brand[] = [];
  valuationorganizations: Valuationorganization[] = [];
  valuationstatuses: Valuationstatus[] = [];


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
    return this.form.controls.vehiclenmodel as FormControl;
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

  get vehicleField(): FormControl{
    return this.form.controls. vehicle as FormControl;
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


    this.valuation = await this.valuationService.get(this.selectedId);
    this.setValues();

  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_VALUATION);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_VALUATIONS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_VALUATION_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_VALUATION);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_VALUATION);
  }

  discardChanges(): void {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.setValues();
  }

  setValues(): void {

    this.vehicleField.disable();

    if (this.chassisnumberField.pristine) {
      this.chassisnumberField.setValue(this.valuation.chassisnumber);
    }

    if (this.enginenumberField.pristine) {
      this.enginenumberField.setValue(this.valuation.enginenumber);
    }

    if (this.yearofmanufactureField.pristine) {
      this.yearofmanufactureField.setValue(this.valuation.yearofmanufacture);
    }

    if (this.dateofregistrationField.pristine) {
      this.dateofregistrationField.setValue(this.valuation.dateofregistration);
    }

    if (this.colorField.pristine) {
      this.colorField.setValue(this.valuation.color);
    }

    if (this.originalcolorField.pristine) {
      this.originalcolorField.setValue(this.valuation.originalcolor);
    }

    if (this.descriptionField.pristine) {
      this.descriptionField.setValue(this.valuation.description);
    }

    if (this.enginecapacityField.pristine) {
      this.enginecapacityField.setValue(this.valuation.enginecapacity);
    }

    if (this.fueltypeField.pristine) {
      this.fueltypeField.setValue(this.valuation.fueltype.id);
    }

    if (this.vehiclemodelField.pristine) {
      this.vehiclemodelField.setValue(this.valuation.vehiclemodel.id);
    }

    if (this.provinceField.pristine) {
      this.provinceField.setValue(this.valuation.province.id);
    }

    if (this.registrationnoField.pristine) {
      this.registrationnoField.setValue(this.valuation.registrationno);
    }

    if (this.vehicleconditionField.pristine) {
      this.vehicleconditionField.setValue(this.valuation.vehiclecondition.id);
    }

    if (this.countryField.pristine) {
      this.countryField.setValue(this.valuation.country.id);
    }

    if (this.vehicletypeField.pristine) {
      this.vehicletypeField.setValue(this.valuation.vehicletype.id);
    }

    if (this.brandField.pristine) {
      this.brandField.setValue(this.valuation.brand.id);
    }

    if (this.odometerreadingField.pristine) {
      this.odometerreadingField.setValue(this.valuation.odometerreading);
    }

    if (this.marketvalueField.pristine) {
      this.marketvalueField.setValue(this.valuation.marketvalue);
    }

    if (this.forcedsalesvalueField.pristine) {
      this.forcedsalesvalueField.setValue(this.valuation.forcedsalesvalue);
    }

    if (this.valuationdateField.pristine) {
      this.valuationdateField.setValue(this.valuation.valuationdate);
    }

    if (this.valuationorganizationField.pristine) {
      this.valuationorganizationField.setValue(this.valuation.valuationorganization.id);
    }

   if (this.valuationstatusField.pristine) {
      this.valuationstatusField.setValue(this.valuation.valuationstatus.id);
    }

  }

  async submit(): Promise<void> {


    const newvaluation: Valuation = new Valuation();
    newvaluation.chassisnumber = this.chassisnumberField.value;
    newvaluation.enginenumber = this.enginenumberField.value;
    newvaluation.yearofmanufacture = DateHelper.getDateAsString(this.yearofmanufactureField.value);
    newvaluation.dateofregistration = DateHelper.getDateAsString(this.yearofmanufactureField.value);
    newvaluation.color = this.colorField.value;
    newvaluation.originalcolor = this.originalcolorField.value;
    newvaluation.description = this.descriptionField.value;
    newvaluation.enginecapacity = this.enginecapacityField.value;
    newvaluation.fueltype = this.fueltypeField.value;
    newvaluation.vehiclemodel = this.vehiclemodelField.value;
    newvaluation.province = this.provinceField.value;
    newvaluation.registrationno = this.registrationnoField.value;
    newvaluation.vehiclecondition = this.vehicleconditionField.value;
    newvaluation.country = this.countryField.value;
    newvaluation.vehicletype = this.vehicletypeField.value;
    newvaluation.brand = this.brandField.value;
    newvaluation.odometerreading = this.odometerreadingField.value;
    newvaluation.marketvalue = this.marketvalueField.value;
    newvaluation.forcedsalesvalue = this.forcedsalesvalueField.value;
    newvaluation.valuationdate = DateHelper.getDateAsString(this.valuationdateField.value);
    newvaluation.valuationorganization = this.valuationorganizationField.value;
    newvaluation.valuationstatus = this.valuationstatusField.value;
    newvaluation.vehicle = this.vehicleField.value;



    try {
      const resourceLink: ResourceLink = await this.valuationService.update(this.selectedId, newvaluation);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/valuations/' + resourceLink.id);
      } else {
        await this.router.navigateByUrl('/valuations');
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

          if (msg.vehicle) {
            this.vehicleField.setErrors({server: msg.vehicle});
            knownError = true;
          }

          if (msg.chassisnumber) {
            this.chassisnumberField.setErrors({server: msg.chassisnumber});
            knownError = true;
          }
          if (msg.enginenumber) {
            this.enginenumberField.setErrors({server: msg.enginenumber});
            knownError = true;
          }
          if (msg.yearofmanufacture) {
            this.yearofmanufactureField.setErrors({server: msg.yearofmanufacture});
            knownError = true;
          }
          if (msg.dateofregistration) {
            this.dateofregistrationField.setErrors({server: msg.dateofregistration});
            knownError = true;
          }
          if (msg.color) {
            this.colorField.setErrors({server: msg.color});
            knownError = true;
          }
          if (msg.originalcolor) {
            this.originalcolorField.setErrors({server: msg.originalcolor});
            knownError = true;
          }
          if (msg.description) {
            this.descriptionField.setErrors({server: msg.description});
            knownError = true;
          }
          if (msg.enginecapacity) {
            this.enginecapacityField.setErrors({server: msg.enginecapacity});
            knownError = true;
          }
          if (msg.fueltype) {
            this.fueltypeField.setErrors({server: msg.fueltype});
            knownError = true;
          }
          if (msg.vehiclemodel) {
            this.vehiclemodelField.setErrors({server: msg.vehiclemodel});
            knownError = true;
          }
          if (msg.province) {
            this.provinceField.setErrors({server: msg.province});
            knownError = true;
          }
          if (msg.registrationno) {
            this.registrationnoField.setErrors({server: msg.registrationno});
            knownError = true;
          }
          if (msg.vehiclecondition) {
            this.vehicleconditionField.setErrors({server: msg.vehiclecondition});
            knownError = true;
          }
          if (msg.country) {
            this.countryField.setErrors({server: msg.country});
            knownError = true;
          }
          if (msg.vehicletype) {
            this.vehicletypeField.setErrors({server: msg.vehicletype});
            knownError = true;
          }
          if (msg.brand) {
            this.brandField.setErrors({server: msg.brand});
            knownError = true;
          }
          if (msg.odometerreading) {
            this.odometerreadingField.setErrors({server: msg.odometerreading});
            knownError = true;
          }
          if (msg.marketvalue) {
            this.marketvalueField.setErrors({server: msg.marketvalue});
            knownError = true;
          }
          if (msg.forcedsalesvalue) {
            this.forcedsalesvalueField.setErrors({server: msg.forcedsalesvalue});
            knownError = true;
          }
          if (msg.valuationdate) {
            this.valuationdateField.setErrors({server: msg.valuationdate});
            knownError = true;
          }
          if (msg.valuationorganization) {
            this.valuationorganizationField.setErrors({server: msg.valuationorganization});
            knownError = true;
          }
          if (msg.valuationstatus) {
            this.valuationstatusField.setErrors({server: msg.valuationstatus});
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
}
