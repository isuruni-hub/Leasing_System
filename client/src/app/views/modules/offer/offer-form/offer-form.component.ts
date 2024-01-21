import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {OfferService} from '../../../../services/offer.service';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {Offer} from '../../../../entities/offer';
import {ResourceLink} from '../../../../shared/resource-link';
import {Insurancecompany} from '../../../../entities/insurancecompany';
import {InsurancecompanyService} from '../../../../services/insurancecompany.service';
import {Productcategory} from '../../../../entities/productcategory';
import {ProductcategoryService} from '../../../../services/productcategory.service';
import {PageRequest} from '../../../../shared/page-request';
import {InstallmentSubFormComponent} from './installment-sub-form/installment-sub-form.component';
import {Offerrequest} from '../../../../entities/offerrequest';
import {OfferrequestService} from '../../../../services/offerrequest.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent extends AbstractComponent implements OnInit {

  @ViewChild(InstallmentSubFormComponent) installmentSubForm: InstallmentSubFormComponent;

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


  get offerrequestField(): FormControl{
    return this.form.controls.offerrequest as FormControl;
  }

  get productcategoryField(): FormControl{
    return this.form.controls.productcategory as FormControl;
  }

  get financingamountField(): FormControl{
    return this.form.controls.financingamount as FormControl;
  }

  get interestrateField(): FormControl{
    return this.form.controls.interestrate as FormControl;
  }


  get periodoffinancingField(): FormControl{
    return this.form.controls.periodoffinancing as FormControl;
  }

  get documentchargesField(): FormControl{
    return this.form.controls.documentcharges as FormControl;
  }

  get stampdutyField(): FormControl{
    return this.form.controls.stampduty as FormControl;
  }

  get brokercommissionField(): FormControl{
    return this.form.controls.brokercommission as FormControl;
  }

  get insurancepremiumField(): FormControl{
    return this.form.controls.insurancepremium as FormControl;
  }

  get insurancecompanyField(): FormControl{
    return this.form.controls.insurancecompany as FormControl;
  }

  get rmvchargesField(): FormControl{
    return this.form.controls.rmvcharges as FormControl;
  }


  get incentivefeeField(): FormControl{
    return this.form.controls.incentivefee as FormControl;
  }



  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private offerService: OfferService,
    private offerrequestService: OfferrequestService,
    private insurancecompanyService: InsurancecompanyService,
    private productcategoryService: ProductcategoryService,
  ) {super(); }


  ngOnInit(): void {
    this.loadData();
    this.refreshData();
  }



  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.add) { return; }

    this.offerrequestService.getAllBasic(new PageRequest()).then((offerrequests) => {
      this.offerrequests = offerrequests.content;
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

    this.insurancecompanyService.getAllBasic(new PageRequest()).then((insurancecompanies) => {
      this.insurancecompanies = insurancecompanies.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }



  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_OFFER);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_OFFERS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_OFFER_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_OFFER);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_OFFER);
  }


  async submit(): Promise<void> {




    const offer: Offer = new Offer();

    offer.offerrequest = this.offerrequestField.value;
    offer.productcategory = this.productcategoryField.value;
    offer.financingamount = this.financingamountField.value;
    offer.interestrate = this.interestrateField.value;
    offer.periodoffinancing = this.periodoffinancingField.value;
    offer.documentcharges = this.documentchargesField.value;
    offer.stampduty = this.stampdutyField.value;
    offer.brokercommission = this.brokercommissionField.value;
    offer.insurancepremium = this.insurancepremiumField.value;
    offer.insurancecompany = this.insurancecompanyField.value;
    offer.rmvcharges = this.rmvchargesField.value;
    offer.incentivefee = this.incentivefeeField.value;



    try{
      const resourceLink: ResourceLink = await this.offerService.add(offer);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/offers/' + resourceLink.id);
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
          if (msg.offerrequest) { this.offerrequestField.setErrors({server: msg.offerrequest}); knownError = true; }
          if (msg.productcategory) { this.productcategoryField.setErrors({server: msg.productcategory}); knownError = true; }
          if (msg.financingamount) { this.financingamountField.setErrors({server: msg.financingamount}); knownError = true; }
          if (msg.interestrate) { this.interestrateField.setErrors({server: msg.interestrate}); knownError = true; }
          if (msg.periodoffinancing) { this.periodoffinancingField.setErrors({server: msg.periodoffinancing}); knownError = true; }
          if (msg.documentcharges) { this.documentchargesField.setErrors({server: msg.documentcharges}); knownError = true; }
          if (msg.stampduty) { this.stampdutyField.setErrors({server: msg.stampduty}); knownError = true; }
          if (msg.brokercommission) { this.brokercommissionField.setErrors({server: msg.brokercommission}); knownError = true; }
          if (msg.insurancepremium) { this.insurancepremiumField.setErrors({server: msg.insurancepremium}); knownError = true; }
          if (msg.insurancecompany) { this.insurancecompanyField.setErrors({server: msg.insurancecompany}); knownError = true; }
          if (msg.rmvcharges) { this.rmvchargesField.setErrors({server: msg.rmvcharges}); knownError = true; }
          if (msg.incentivefee) { this.incentivefeeField.setErrors({server: msg.incentivefee}); knownError = true; }

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
