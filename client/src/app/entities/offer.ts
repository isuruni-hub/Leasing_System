import {User} from './user';
import {DataPage} from '../shared/data-page';
import {Insurancecompany} from './insurancecompany';
import {Productcategory} from './productcategory';
import {Customerincome} from './customerincome';
import {Installment} from './installment';
import {Offerrequest} from './offerrequest';

export class Offer {
  id: number;
  code: string;
  tocreation: string;
  offerrequest: Offerrequest;
  interestrate: number;
  periodoffinancing: number;
  financingamount:number;
  documentcharges: number;
  stampduty: number;
  brokercommission: number;
  insurancepremium: number;
  rmvcharges: number;
  incentivefee: number;
  insurancecompany: Insurancecompany;
  productcategory: Productcategory;
  installmentList: Installment[];

  creator: User;


  constructor(id: number = null) {
    this.id = id;
  }
}

export class OfferDataPage extends DataPage {
  content: Offer[];
}
