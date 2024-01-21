import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {ResourceLink} from '../../../../shared/resource-link';
import {Offerrequest} from '../../../../entities/offerrequest';
import {Insurancecompany} from '../../../../entities/insurancecompany';
import {Productcategory} from '../../../../entities/productcategory';
import {OfferrequestService} from '../../../../services/offerrequest.service';
import {InsurancecompanyService} from '../../../../services/insurancecompany.service';
import {ProductcategoryService} from '../../../../services/productcategory.service';
import {PageRequest} from '../../../../shared/page-request';
import {async} from '@angular/core/testing';
import {Offer} from '../../../../entities/offer';
import {OfferService} from '../../../../services/offer.service';


@Component({
  selector: 'app-offer-update-form',
  templateUrl: './offer-update-form.component.html',
  styleUrls: ['./offer-update-form.component.scss']
})
export class OfferUpdateFormComponent extends AbstractComponent implements OnInit {

  selectedId: number;
  offer: Offer;

  offerrequests: Offerrequest[] = [];
  insurancecompanies: Insurancecompany[] = [];
  productcategories: Productcategory[] = [];

  form = new FormGroup({

    offerrequest: new FormControl(null, [
      Validators.required,
    ]),
    productcategory: new FormControl(null, [
      Validators.required,
    ]),

    financingamount: new FormControl(null, [
      Validators.required,
    ]),
    interestrate: new FormControl(null, [
      Validators.required,
    ]),
    periodoffinancing: new FormControl(null, [
      Validators.required,
    ]),
    documentcharges: new FormControl(null, [
      Validators.required,
    ]),
    stampduty: new FormControl(),
    brokercommission: new FormControl(),
    insurancepremium: new FormControl(null, [
      Validators.required,
    ]),
    insurancecompany: new FormControl(null, [
      Validators.required,
    ]),
    rmvcharges: new FormControl(null, [
      Validators.required,
    ]),
    incentivefee: new FormControl(),


  });

  get offerrequestField(): FormControl {
    return this.form.controls.offerrequest as FormControl;
  }

  get productcategoryField(): FormControl {
    return this.form.controls.productcategory as FormControl;
  }

  get financingamountField(): FormControl {
    return this.form.controls.financingamount as FormControl;
  }

  get interestrateField(): FormControl {
    return this.form.controls.interestrate as FormControl;
  }


  get periodoffinancingField(): FormControl {
    return this.form.controls.periodoffinancing as FormControl;
  }

  get documentchargesField(): FormControl {
    return this.form.controls.documentcharges as FormControl;
  }

  get stampdutyField(): FormControl {
    return this.form.controls.stampduty as FormControl;
  }

  get brokercommissionField(): FormControl {
    return this.form.controls.brokercommission as FormControl;
  }

  get insurancepremiumField(): FormControl {
    return this.form.controls.insurancepremium as FormControl;
  }

  get insurancecompanyField(): FormControl {
    return this.form.controls.insurancecompany as FormControl;
  }

  get rmvchargesField(): FormControl {
    return this.form.controls.rmvcharges as FormControl;
  }


  get incentivefeeField(): FormControl {
    return this.form.controls.incentivefee as FormControl;
  }



  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private offerService: OfferService,
    private offerrequestService: OfferrequestService,
    private insurancecompanyService: InsurancecompanyService,
    private productcategoryService: ProductcategoryService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.selectedId = +params.get('id');
      await this.loadData();
      this.refreshData();
    });
  }

  async loadData(): Promise<any> {

    this.updatePrivileges();
    if (!this.privilege.update) {
      return;
    }

    this.insurancecompanyService.getAllBasic(new PageRequest()).then((insurancecompanies) => {
      this.insurancecompanies = insurancecompanies.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.productcategoryService.getAll().then((productcategories) => {
      this.productcategories = productcategories;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.offerrequestService.getAllBasic(new PageRequest()).then((offerrequests) => {
      this.offerrequests = offerrequests.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.offer = await this.offerService.get(this.selectedId);
    this.setValues();
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_OFFER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_OFFERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_OFFER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_OFFER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_OFFER);
  }

  discardChanges(): void {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.setValues();
  }

  setValues(): void {
    if (this.offerrequestField.pristine) {
      this.offerrequestField.setValue(this.offer.offerrequest.id);
    }
    if (this.productcategoryField.pristine) {
      this.productcategoryField.setValue(this.offer.productcategory.id);
    }

    if (this.financingamountField.pristine) {
      this.financingamountField.setValue(this.offer.financingamount);
    }

    if (this.interestrateField.pristine) {
      this.interestrateField.setValue(this.offer.interestrate);
    }

    if (this.periodoffinancingField.pristine) {
      this.periodoffinancingField.setValue(this.offer.periodoffinancing);
    }
    if (this.documentchargesField.pristine) {
      this.documentchargesField.setValue(this.offer.documentcharges);
    }
    if (this.stampdutyField.pristine) {
      this.stampdutyField.setValue(this.offer.stampduty);
    }
    if (this.brokercommissionField.pristine) {
      this.brokercommissionField.setValue(this.offer.brokercommission);
    }

    if (this.insurancepremiumField.pristine) {
      this.insurancepremiumField.setValue(this.offer.insurancepremium);
    }

    if (this.insurancecompanyField.pristine) {
      this.insurancecompanyField.setValue(this.offer.insurancecompany.id);
    }

    if (this.rmvchargesField.pristine) {
      this.rmvchargesField.setValue(this.offer.rmvcharges);
    }

    if (this.incentivefeeField.pristine) {
      this.incentivefeeField.setValue(this.offer.incentivefee);
    }

  }

  async submit(): Promise<void> {

    const newoffer: Offer = new Offer();


    newoffer.offerrequest = this.offerrequestField.value;
    newoffer.productcategory = this.productcategoryField.value;
    newoffer.financingamount = this.financingamountField.value;
    newoffer.interestrate = this.interestrateField.value;
    newoffer.periodoffinancing = this.periodoffinancingField.value;
    newoffer.documentcharges = this.documentchargesField.value;
    newoffer.stampduty = this.stampdutyField.value;
    newoffer.brokercommission = this.brokercommissionField.value;
    newoffer.insurancepremium = this.insurancepremiumField.value;
    newoffer.insurancecompany = this.insurancecompanyField.value;
    newoffer.rmvcharges = this.rmvchargesField.value;
    newoffer.incentivefee = this.incentivefeeField.value;



    try {
      const resourceLink: ResourceLink = await this.offerService.update(this.selectedId, newoffer);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/offers/' + resourceLink.id);
      } else {
        await this.router.navigateByUrl('/offers');
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
          if (msg.offerrequest) {
            this.offerrequestField.setErrors({server: msg.offerrequest});
            knownError = true;
          }
          if (msg.productcategory) {
            this.productcategoryField.setErrors({server: msg.productcategory});
            knownError = true;
          }
          if (msg.financingamount) {
            this.financingamountField.setErrors({server: msg.financingamount});
            knownError = true;
          }
          if (msg.interestrate) {
            this.interestrateField.setErrors({server: msg.interestrate});
            knownError = true;
          }
          if (msg.periodoffinancing) {
            this.periodoffinancingField.setErrors({server: msg.periodoffinancing});
            knownError = true;
          }
          if (msg.documentcharges) {
            this.documentchargesField.setErrors({server: msg.documentcharges});
            knownError = true;
          }
          if (msg.stampduty) {
            this.stampdutyField.setErrors({server: msg.stampduty});
            knownError = true;
          }
          if (msg.brokercommission) {
            this.brokercommissionField.setErrors({server: msg.brokercommission});
            knownError = true;
          }
          if (msg.insurancepremium) {
            this.insurancepremiumField.setErrors({server: msg.insurancepremium});
            knownError = true;
          }
          if (msg.insurancecompany) {
            this.insurancecompanyField.setErrors({server: msg.insurancecompany});
            knownError = true;
          }
          if (msg.rmvcharges) {
            this.rmvchargesField.setErrors({server: msg.rmvcharges});
            knownError = true;
          }
          if (msg.incentivefee) {
            this.incentivefeeField.setErrors({server: msg.incentivefee});
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
