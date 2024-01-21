import {User} from './user';

import {DataPage} from '../shared/data-page';
import {Insurancecompanystatus} from './insurancecompanystatus';


export class Insurancecompany {
  id: number;
  code: string;
  name: string;
  contact1: string;
  contact2: string;
  address: string;
  email: string;
  fax: string;
  insurancecompanystatus:Insurancecompanystatus;
  tocreation: string;

  creator: User;

  constructor(id: number = null) {
    this.id = id;
  }
}

export class InsurancecompanyDataPage extends DataPage {
  content: Insurancecompany[];
}
