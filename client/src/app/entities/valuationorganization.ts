import {User} from './user';
import {DataPage} from '../shared/data-page';
import {Valuationorganizationstatus} from './valuationorganizationstatus';


export class Valuationorganization {
  id: number;
  code: string;
  name: string;
  contact1: string;
  contact2: string;
  address: string;
  email: string;
  fax: string;
  valuationorganizationstatus: Valuationorganizationstatus;
  tocreation: string;
  creator: User;


  constructor(id: number = null) {
    this.id = id;
  }
}

export class ValuationorganizationDataPage extends DataPage {
  content: Valuationorganization[];
}
